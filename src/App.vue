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
    <form class="form" @submit.prevent="addTodo(todo)">
      <div class="form__input">
        <label for="todo"
               class="input-label"
               :class="{ active: !!todo.text }">
          To Do
        </label>
        <input id="todo" type="text" name="todo" v-model="todo.text">
      </div>
      <div class="form__btn" v-if="!hasTodo">
        <button type="submit" name="submit" :disabled="!todo.text">Save</button>
      </div>
      <div class="form__btn" v-else>
        <button class="edit" type="button" name="edit" @click.prevent="editTodo(todo)" :disabled="!todo.text">Edit</button>
        <button class="remove" type="button" name="cancel" @click.prevent="cancel()">Cancel</button>
      </div>
    </form>
    <div class="view">
      <div class="view__progress-bar">
        <div class="view__progress-bar__box">
          <div class="view__progress-bar__box__content" :style="{ width: `${totalDone}%` }"></div>
        </div>
      </div>
      <div class="view__ops">
        <div class="view__ops__done">
          <label for="show_done">Show Done</label>
          <input type="checkbox" name="show_done" v-model="onlyDone">
        </div>
        <div class="view__ops__clean">
          <button type="button" name="clean" @click="clearDone()" :disabled="done.length == 0">Clear Done</button>
        </div>
      </div>
      <div class="view__items">
        <div class="view__items__todo">
          <div class="view__items__todo__text">
            <h4>To Do</h4>
          </div>
          <div class="view__items__todo__checkbox">
            <h4>Done</h4>
          </div>
          <div class="view__items__todo__options">
            <h4>Options</h4>
          </div>
        </div>
        <div class="view__items__todo"
             v-for="td in onlyDone?done:todos">
          <div class="view__items__todo__text">
            <span>{{ td.text }}</span>
          </div>
          <div class="view__items__todo__checkbox">
            <input type="checkbox" @change="doneChanged(td)" v-model="td.done">
          </div>
          <div class="view__items__todo__options">
            <button class="edit" @click="setToEdit(td)" :disabled="hasTodo">Edit</button>
            <button class="remove" @click="remove(td._key)" :disabled="hasTodo">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      todo: {
        text: '',
        done: false
      },
      onlyDone: false
    }
  },
  computed: {
    ...mapGetters({
      todos: 'getTodos',
      done: 'getDone',
      hasTodo: 'hasTodo',
      currentTodo: 'getTodo'
    }),
    totalDone () {
      let done = 0
      if (this.todos.length === 0) return 0
      else {
        this.todos.map(t => {
          if (t.done) done++
        })
        return (done * 100)/this.todos.length
      }
    }
  },
  methods: {
    ...mapActions([
      'add',
      'getAll',
      'edit',
      'remove'
    ]),
    addTodo (todo) {
      if (!this.hasTodo) {
        this.add(todo)
        this.todo = {
          text: '',
          done: false
        }
      }
    },
    doneChanged (todo) {
      this.edit(todo)
    },
    setToEdit (todo) {
      this.$store.commit('setTodo', todo)
      this.todo = this.currentTodo
    },
    editTodo (todo) {
      this.edit(todo)
      this.cancel()
    },
    cancel () {
      this.todo = {
        text: '',
        done: false
      }
      this.$store.commit('setTodo', null)
    },
    clearDone () {
      this.done.map(t => {
        this.remove(t._key)
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.getAll()
    }, 1000)
  }
}
</script>

<style lang="scss">
$color-black: #2c3e50;
$color-white: #fff;
$color-gray: #ddd;
$color-green: #42b983;
$color-blue: #4A70FE;
$color-red: lighten(#C2003C, 10);
$color-orange: #FF9C00;

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
  padding: 10px;
  &__input {
    display: inline-block;
    position: relative;
    padding: 5px 0px;
    label {
      position: absolute;
      transition: all .2s ease-out;
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
    font-weight: 600;
    button {
      letter-spacing: 1.5px;
      border: 2px solid lighten($color-green, 10);
      background-color: lighten($color-green, 10);
      padding: 5px 15px;
      border-radius: $radius;
      &:hover {
        border-color: lighten($color-green, 20);
        background-color: lighten($color-green, 20);
      }
      &:disabled {
        border-color: lighten($color-green, 30);
        background-color: lighten($color-green, 30);
        cursor: not-allowed;
      }
    }
  }
}

button {
  color: darken($color-white, 5);
  border-style: solid;
  transition: all .2s;
  &.edit {
    border-color: $color-blue;
    background-color: $color-blue;
    &:hover {
      border-color: lighten($color-blue, 10);
      background-color: lighten($color-blue, 10);
    }
    &:disabled {
      border-color: lighten($color-blue, 20);
      background-color: lighten($color-blue, 20);
    }
  }
  &.remove {
    border-color: $color-red;
    background-color: $color-red;
    &:hover {
      border-color: lighten($color-red, 20);
      background-color: lighten($color-red, 20);
    }
    &:disabled {
      border-color: lighten($color-red, 30);
      background-color: lighten($color-red, 30);
    }
  }
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
}

.view {
  display: flex;
  border-top: 2px solid $color-gray;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-content: stretch;
  &__progress-bar {
    width: 100%;
    padding: 5px 15px;
    &__box {
      width: calc(100% - 40px);
      height: 30px;
      border: 5px solid $color-gray;
      border-radius: $radius;
      &__content {
        width: 0%;
        transition: width .75s ease-out;
        height: 100%;
        background-image: linear-gradient(to right, lighten($color-green, 10), $color-green);
        border-radius: $radius;
      }
    }
  }
  &__ops {
    display: flex;
    justify-content: center;
    flex-direction: column;
    &__done {
      margin-bottom: 5px;
      display: flex;
      align-self: center;
      height: 20px;
      label {
        vertical-align: middle;
        margin-bottom: 2.5px;
      }
      input {
        align-self: center;
        margin: 0px 0px 5px 5px;
      }
    }
    &__clean {
      button {
        border-radius: $radius;
        padding: 6px 15px;
        border-color: lighten($color-orange, 10);
        background-color: lighten($color-orange, 10);
        &:hover {
          border-color: lighten($color-orange, 20);
          background-color: lighten($color-orange, 20);
        }
        &:active {
          border-color: lighten($color-orange, 25);
          background-color: lighten($color-orange, 25);
        }
        &:disabled {
          border-color: lighten($color-orange, 30);
          background-color: lighten($color-orange, 30);
        }
      }
    }
  }
  &__items {
    padding: 5px 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: stretch;
    &__todo {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-self: center;
      justify-content: center;
      width: 100%;
      max-width: 550px;
      padding: 5px 15px;
      &:first-child {
        height: 40px;
        border-bottom: 2px solid $color-gray;
        margin-bottom: 5px;
        .view__items__todo__text {
          text-align: center;
        }
      }
      &__text {
        flex-basis: 55%;
        text-align: left;
        vertical-align: middle;
      }
      &__checkbox {
        text-align: left;
        flex-basis: 15%;
        display: flex;
        justify-content: center;
        input {
          align-self: center;
        }
      }
      &__options {
        flex-basis: 30%;
        button {
          border-radius: 5px;
        }
      }
    }
  }
}

@media screen and (min-width: 640px) {
  #app {

  }
}
</style>
