<script setup lang="ts">
import type { CategoryValue, PriorityValue } from "~/utils/constants";

type MapPinProps = {
  status?: string;
  priority?: PriorityValue;
  category?: CategoryValue;
};

defineProps<MapPinProps>();
</script>

<template>
  <div class="relative cursor-pointer">
    <svg
      v-if="!priority && !category"
      width="43"
      height="68"
      viewBox="0 0 43 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.1465 0C32.7445 0 42.1465 9.40202 42.1465 21C42.1465 31.9234 33.8064 40.8989 23.1465 41.906V64C23.1465 65.1046 22.2511 66 21.1465 66C20.0419 66 19.1465 65.1046 19.1465 64V41.906C8.48662 40.8989 0.146484 31.9234 0.146484 21C0.146484 9.40202 9.5485 0 21.1465 0Z"
        fill="#08080A"
      />
      <path
        d="M28.1465 21C28.1465 17.134 25.0125 14 21.1465 14C17.2805 14 14.1465 17.134 14.1465 21C14.1465 24.866 17.2805 28 21.1465 28C25.0125 28 28.1465 24.866 28.1465 21Z"
        fill="white"
      />
      <path
        opacity="0.3"
        d="M21.1465 68C23.9079 68 26.1465 66.8807 26.1465 65.5C26.1465 64.1193 23.9079 63 21.1465 63C18.3851 63 16.1465 64.1193 16.1465 65.5C16.1465 66.8807 18.3851 68 21.1465 68Z"
        fill="#08080A"
      />
    </svg>

    <template v-else>
      <svg
        width="52"
        height="60"
        viewBox="0 0 52 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_6_2)">
          <ellipse
            cx="26"
            cy="53.5"
            rx="7"
            ry="2.5"
            fill="black"
            fill-opacity="0.2"
          />
        </g>
        <g filter="url(#filter1_d_6_2)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M26 4C37.598 4 47 13.402 47 25C47 33.8926 41.4727 41.4942 33.6663 44.5567L27.1961 53.4007C27.0612 53.5858 26.8821 53.7369 26.6739 53.8412C26.4657 53.9455 26.2346 54 26 54C25.7654 54 25.5343 53.9455 25.3261 53.8412C25.1179 53.7369 24.9388 53.5858 24.8039 53.4007L18.3337 44.5567C10.5273 41.4941 5 33.8926 5 25C5 13.402 14.402 4 26 4Z"
            :class="['fill-current', priority?.color]"
          />
        </g>
        <path
          d="M43 25C43 15.6112 35.3888 8 26 8C16.6112 8 9 15.6112 9 25C9 34.3888 16.6112 42 26 42C35.3888 42 43 34.3888 43 25Z"
          fill="white"
        />
        <defs>
          <filter
            id="filter0_f_6_2"
            x="17"
            y="49"
            width="18"
            height="9"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="1"
              result="effect1_foregroundBlur_6_2"
            />
          </filter>
          <filter
            id="filter1_d_6_2"
            x="0"
            y="0"
            width="52"
            height="60"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_6_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_6_2"
              result="shape"
            />
          </filter>
        </defs>

        <component
          :is="
            getCategoryIcon(category?.name, {
              as: 'image',
              urlKey: 'href',
            })
          "
          width="20"
          height="20"
          x="16"
          y="16"
        />
      </svg>
    </template>
  </div>
</template>
