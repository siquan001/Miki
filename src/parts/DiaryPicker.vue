<template>
  <div class="diary-picker app-dialog" :class="{ show }">
    <div class="b-drop" @click="show = false"></div>
    <div class="a-content">
      <header class="picker-header">
        <div class="tabs">
          <span :class="{ active: viewMode === 'calendar' }" @click="viewMode = 'calendar'">日历视图</span>
          <span :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">列表视图</span>
        </div>
        <MIcon name="close" @click="show=false" class="close-dialog-btn" />
        <button class="write-today-btn" @click="writeToday">✍️ 写日记</button>
      </header>

      <main class="picker-body">
        <div v-if="viewMode === 'list'" class="list-container">
          <div 
            v-for="item in processedDiaries" 
            :key="item.id" 
            class="diary-item"
            @click="handleSelect(item.date)"
          >
            <span class="item-date">{{ item.date.format('YYYY-MM-DD') }}</span>
            <span class="item-label">{{ item.label }}</span>
          </div>
          <div v-if="processedDiaries.length === 0" class="empty">暂时没有日记哦</div>
        </div>

        <div v-else class="calendar-container">
          <VCalendar
            transparent
            borderless
            expanded
            :attributes="calendarAttributes"
            @dayclick="onDayClick"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { NoteCore, type DiaryMeta } from '../core';
import { nowDiaryDate } from '../core/store';
import dayjs, { Dayjs } from 'dayjs';
import MIcon from '../util/MIcon.vue';

// 定义复合类型，方便内部处理
interface DiaryFull extends DiaryMeta {
  date: Dayjs;
}

const show = defineModel("show", {
  default: false,
  type: Boolean
});

const viewMode = ref<'calendar' | 'list'>('calendar');
const processedDiaries = ref<DiaryFull[]>([]);

// 初始化获取数据
onMounted(async () => {
  const metas = await NoteCore.getDiaries();
  // 严谨起见：并发获取日期以提高速度
  processedDiaries.value = await Promise.all(
    metas.map(async (m) => ({
      ...m,
      date: await NoteCore.getDiaryDate(m.id)
    }))
  );
});

// 映射 v-calendar 所需属性
const calendarAttributes = computed(() => {
  return processedDiaries.value.map(item => ({
    key: item.id,
    highlight: 'blue',
    dates: item.date.toDate(),
    popover: {
      label: item.label,
      visibility: 'hover',
    },
    // 将日期对象存入自定义数据，方便点击时提取
    customData: item.date
  }));
});

// 统一的选择处理逻辑
const handleSelect = (date: Dayjs) => {
  nowDiaryDate.value = date;
  show.value = false;
};

// 日历点击回调
const onDayClick = (day: any) => {
  // 只有标记了日记的日期才有 attributes
  const attr = day.attributes.find((a: any) => a.key);
  
  if (attr) {
    handleSelect(attr.customData);
  }
};

// “写日记”按钮：指向今天
const writeToday = () => {
  handleSelect(dayjs());
};
</script>

<style lang="scss">

.picker-header {
  padding: 12px 16px;
  overflow:hidden;
  .tabs {
    float: left;
    span {
      cursor: pointer;
      font-size: 14px;
      color: #999;
      margin: 0 20px;
      transition: color 0.2s;
      display:block;
      line-height: 30px;
      float: left;
      &.active {
        color: rgb(118, 187, 255);
        font-weight: bold;
      }
    }
  }
  .m-icon{
        width: 20px;
        height: 20px;
        padding: 5px;
        float: right;
        cursor: pointer;
        &:hover {
            color: #409eff;
        }
    }

  .write-today-btn {
    float: right;
    background: rgb(118, 187, 255);
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    &:hover { background: rgb(98, 176, 255); }
  }
}
.calendar-container{
    padding: 0 30px;
}
.picker-body {
  overflow-y: auto;
  padding: 0 16px;
  .list-container {
    .diary-item {
      padding: 12px;
      margin: 5px 0;
      border-radius: 8px;
      cursor: pointer;
      background-color: #eef6fd;
      overflow:hidden;
      &:hover { background: #f8fafc; }

      .item-date {
        font-size: 15px;
        color: #1e293b;
        font-weight: bold;
        float: left;
      }
      .item-label {
        font-size: 15px;
        color: #1e293b;
        float: right;
      }
    }
  }
}

.vc-blue{
  --vc-accent-600:rgb(118, 187, 255)!important;
}
</style>