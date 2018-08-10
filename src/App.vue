<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Indexed DB - Test</h1>
    <!-- <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
    <form class="form" @submit.prevent="addToDo(todo)">
      <div class="form__input">
        <label for="todo"
               class="input-label"
               :class="{ active: !!todo.text }">
          To Do
        </label>
        <input id="todo" type="text" name="todo" v-model="todo.text">
      </div>
      <div class="form__btn">
        <button type="submit" name="submit">Save</button>
      </div>
    </form>
    <div class="view">

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      todo: {
        text: '',
        finished: false
      }
    }
  },
  methods: {
    addToDo (todo) {
      console.log(todo)
    }
  }
}
</script>

<style lang="scss">
$color-black: #2c3e50;
$color-white: #fff;
$color-gray: #ddd;
$color-green: #42b983;

$radius: 150px;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-black;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 2px solid ;
  padding: 10px;
  &__input {
    display: inline-block;
    position: relative;
    padding: 5px 0px;
    label {
      position: absolute;
      transition: all .1s;
      top: 10px;
      padding-left: 5px;
      font-size: 16px;
      color: rgba($color-black, .5);
      font-weight: 600;
      &.active {
        top: -7px;
        font-size: 12px;
        color: rgba($color-black, 1);
      }
    }
    input {
      border: none;
      border-bottom: 2px solid $color-gray;
      padding: 5px;
      &:active, &:focus {
        outline: none;
        border-color: rgba($color-gray, .5);
      }
    }
  }
  &__btn {
    display: inline-block;
    padding: 5px 0px;
    button {
      color: darken($color-white, 5);
      font-weight: 600;
      letter-spacing: 1.5px;
      border: 2px solid lighten($color-green, 10);
      background-color: lighten($color-green, 10);
      padding: 5px 15px;
      border-radius: $radius;
    }
  }
}

.view {
  display: flex;
  border: 2px solid $color-gray;
  padding: 10px;
}
</style>
