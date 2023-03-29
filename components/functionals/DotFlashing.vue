<script lang="ts" setup>
const { getColor } = useThemeController()
const color = getColor('primary')
const backgroundColor = `${color}33`
</script>

<template>
  <div class="dots-container">
    <div class="dot-flashing" />
  </div>
</template>

<style lang="scss" scoped>
$color: v-bind(color);

.dots-container {
    width: 50px;
    display: inline-flex;
    justify-content: center;
}

.dot-flashing {
    position: relative;
    width: 6px;
    height: 6px;
    border-radius: 4px;
    background-color: $color;
    color: $color;
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;

    &::before,
    &::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0;
    }

    &::before {
        left: -14px;
        width: 6px;
        height: 6px;
        border-radius: 4px;
        background-color: $color;
        color: $color;
        animation: dot-flashing 1s infinite alternate;
        animation-delay: 0s;
    }

    &::after {
        left: 14px;
        width: 6px;
        height: 6px;
        border-radius: 4px;
        background-color: $color;
        color: $color;
        animation: dot-flashing 1s infinite alternate;
        animation-delay: 1s;
    }
}

@keyframes dot-flashing {
    0% {
        background-color: $color;
    }

    50%,
    100% {
        background-color: v-bind(backgroundColor);
    }
}
</style>
