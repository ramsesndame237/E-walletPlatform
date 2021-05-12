<template>
  <div class="breadcrumb elevation-3">
    <v-breadcrumbs :items="items" class="pl-12">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['title'],
  data () {
    return {
      items: [
        { text: 'Home', to: '/' },
        { text: 'Transactions', to: '/app/reports' }
      ],
      sub: ''
    }
  }
}
</script>
