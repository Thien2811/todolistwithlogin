<template>
    <h1>ToDo-Liste</h1>
    <div style="border: 2px solid white; border-radius: 7px;" class="container">
      <div class="addTask  flex-nowrap container" style="padding: 0px">
        <input
          type="text"
          class="form-control"
          placeholder="Task"
          aria-describedby="button-addon2"
          v-model="taskname"
        />
      </div>
      <div class="addTask  flex-nowrap container" style="padding: 0px">
        <textarea
          type="text"
          class="form-control"
          placeholder="Aufgabenbeschreibung"
          aria-describedby="button-addon2"
          v-model="aufgabenbeschreibung"
        ></textarea>
      </div>
      <div class="flex-nowrap"> 
        <select class="select me-2 " v-model="priority" style="border: 0px solid white;">
          <option disabled hidden>Priorität</option>
          <option >Hoch</option>
          <option>Mittel</option>
          <option >Niedrig</option>
        </select>
        <select class="select" v-model="person" style="border: 0px solid white;">
          <option disabled hidden>Zugehörige Person</option>
          <option >Thien</option>
          <option >Dani</option>
          <option >Andi</option>
        </select>
        <div>
          <VueDatePicker v-model="date"></VueDatePicker>
        </div>
      </div>
      <div>
        <button class="btn" type="button" id="button-addon2" @click="addNewTask">
          Task hinzufügen
        </button>
      </div>
      
    </div>
    <div>
      <TaskComponent
        v-for="(i, index) of liste"
        :key="index"
        :taskname="i.taskname"
        :priority="i.priority"
        :aufgabenbeschreibung="i.aufgabenbeschreibung"
        :person="i.person"
        :date="i.date"
        :time="i.time"
        :id="i.id"
        @editname="liste[index].taskname = $event"
        @editbeschreibung="liste[index].aufgabenbeschreibung = $event"
        @delete="remove($event)"
        @taskUpdate="editTaskAufgabe(event)"
      ></TaskComponent>
    </div>
</template>

<script setup>
import { onMounted, ref} from 'vue'
import TaskComponent from '@/components/TaskComponent.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios';

onMounted(async () => {
  await getTasks()
})

const date = ref();


const taskname = ref()
const priority = ref('Priorität')
const aufgabenbeschreibung = ref('')
const person = ref('Zugehörige Person')

const liste = ref([])


async function addNewTask() {
  
  const data = {
    taskname: taskname.value,
    priority: priority.value,
    aufgabenbeschreibung: aufgabenbeschreibung.value,
    person: person.value,
    date: new Date(date.value).getTime(),
    time: date.value.toLocaleString('de').split(', ')[1],
    
  }
  const res = await axios.post("/addtask", data)
  console.log(res.data)
  liste.value.push({
    taskname: taskname.value,
    priority: priority.value,
    aufgabenbeschreibung: aufgabenbeschreibung.value,
    person: person.value,
    date: date.value.toLocaleString('de').split(', ')[0],
    time: date.value.toLocaleString('de').split(', ')[1],
    id: res.data.id
    
  })
  liste.value = liste.value.sort((a, b) => getPriorityInt(b.priority) - getPriorityInt(a.priority))
}
function addNewTaskFromData(element) {
  liste.value.push({
    taskname: element.taskname,
    priority: element.priority,
    aufgabenbeschreibung: element.aufgabenbeschreibung,
    person: element.person,
    date: new Date(element.date).toLocaleString('de').split(', ')[0],
    time: element.time,
    id: element.id
   
  })
  liste.value = liste.value.sort((a, b) => getPriorityInt(b.priority) - getPriorityInt(a.priority))
}

async function getTasks() {
  const res = await axios.get('/gettasks');
  for(const element of res.data.tasks) {
    addNewTaskFromData(element);
  }
}

function getPriorityInt(priority) {
  switch (priority) {
    case 'Hoch':
      return 3
    case 'Mittel':
      return 2
    case 'Niedrig':
      return 1
  }
}

async function remove(id){
  // eslint-disable-next-line no-unused-vars
  const res =  await axios.delete(`/deletetask/${id}`)
  const i = liste.value.findIndex(e => e.id === id);
  liste.value.splice(i, 1);
}
</script>

<style scoped>
h1 {
  text-align: center;

  padding: 30px;
  font-weight: bold;

  color: white;
}
div {
  margin-top: 20px;
  margin-bottom: 20px;
}


.addTask {
  color: white;
}

.btn {
  background-color: white;
  color: black;
  
}

.dropdown {
  min-width: 100px;
  color: black;
  border-color: black;
}

.select{
  padding: 5px;
  border-radius: 5px;
}
</style>


