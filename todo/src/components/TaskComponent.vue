<template>
  <div class="container rounded-3" :style="getPriorityStyle(priority)">
    <div> Aufgabe: 
      <span v-if="!editMode">{{ taskname }}</span>
      <span v-if="editMode">
        <input class="form-control" v-model="tasknameC">
      </span>
    </div>
    <div class="beschreibung"> Beschreibung:
      <span v-if="!editMode">{{ aufgabenbeschreibungC }}</span>
      
      <span v-if="editMode">
        <textarea class="form-control" v-model="aufgabenbeschreibungC" type="text"></textarea>
      </span>
    </div>
    <div> Zugeörige Person(en):
      <span>{{ person }}</span>
    </div>
    <div>
      Status: 

      <span style="margin-left: 5px;" v-if="progress != 100"> Offen</span> 
      <span style="margin-left: 5px;" v-else>Abgeschlossen</span> 
    </div>
    <div>
      Fälligkeitsdatum:
      <span>{{ date }}</span>
      <span>{{ ', um ' + time + ' Uhr' }}</span>
    </div>
    
    <div>
       Fortschritt:
      <input type="range" min="0" max="100" step="25" v-model="progress"/>
      <label style="margin-left: 10px;"> {{ progress }}% </label>
    </div>
    <div>
      <button class="bearbeiten" @click="switchEditMode()">Bearbeiten</button>
      <button class="bearbeiten" @click="$emit('delete', id);">Löschen</button>
    </div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';

const emits = defineEmits(["delete", "editname", "editbeschreibung"])
const props = defineProps(["id", "taskname","priority","aufgabenbeschreibung","person", "date", "time"])

const progress = ref(0);
const editMode = ref(false);
const aufgabenbeschreibungC = ref('');
const tasknameC = ref('');

onMounted(() => {
  aufgabenbeschreibungC.value = props.aufgabenbeschreibung;
  tasknameC.value = props.taskname;
});

function switchEditMode() {
  editMode.value = !editMode.value;
  if(!editMode.value)
  emits('editname', tasknameC);
  emits('editbeschreibung', aufgabenbeschreibungC)
}

function getPriorityStyle(priority) {
  switch(priority) {
    case 'Hoch':
      return 'border: 3px solid red;';
    case 'Mittel':
      return 'border: 3px solid orange;';
    case 'Niedrig':
      return 'border: 3px solid green;';
  }
}



</script>



<style scoped>
.container {
  
  padding: 15px;
  background-color: black;
  color: white;

  
}

.container:hover{
  transform: scale(1.05);
}

div{
  font-weight: bold;
 
}

input{
  display: table-cell;
  vertical-align: middle; 
  
}

input[type="range"] {
  accent-color: dimgrey;
}

.beschreibung{
  font-size: 100%
}

.bearbeiten{
  margin-top: 5px;
  color: white;
  background-color: black;
  border: 1px solid white;
}
</style>