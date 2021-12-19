<template>
  <header>
    <div class="left">
      <slot name="left"/>
    </div>
    <div class="center text-center">
      <slot name="center"/>
    </div>
    <div class="right text-right">
      <slot name="right"/>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  display: flex;
  top: 0;
  z-index: 10;

  .left, .right {
    flex: 1;
  }
  .center {
    flex: 3;
  }
}
</style>
