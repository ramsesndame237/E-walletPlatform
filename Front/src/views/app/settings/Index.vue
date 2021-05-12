<template>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, maiores dolore est optio suscipit iure vero consequatur blanditiis officia, inventore laudantium eos aspernatur, repudiandae aperiam. Eligendi quod tempore incidunt ex!</p>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
  .card-prepend {
    width: 90%;
    margin-left: 5%;

    .card-offset {
      height: 200px;
    }

    .card-content {
      position: absolute;
      top: 0;
    }
  }
</style>