<template>
  <div class="row mt-5">
    <h4>Users</h4>

    <DataTable
      :value="users"
      tableStyle="min-width: 50rem"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
      :sortField="sortField"
      :sortOrder="sortOrder"
      :filters="filters"
      filterDisplay="menu"
      ref="dt"
    >
      <template #header>
        <div class="text-end pb-4">
          <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
        </div>
      </template>
      <Column field="email" header="Email" :sortable="true" :filter="true">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column field="isAustralian" header="Australian Resident" :sortable="true" :filter="true">
        <template #filter="{ filterCallback }">
          <InputText
            type="text"
            v-model="filters.isAustralian.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="gender" header="Gender" :sortable="true" :filter="true">
        <template #filter="{ filterCallback }">
          <InputText
            type="text"
            v-model="filters.gender.value"
            @input="filterCallback()"
            class="p-column-filter"
          /> </template
      ></Column>
      <Column field="reason" header="Reason" :sortable="true" :filter="true">
        <template #filter="{ filterCallback }">
          <InputText
            type="text"
            v-model="filters.reason.value"
            @input="filterCallback()"
            class="p-column-filter"
          /> </template
      ></Column>
      <Column field="online" header="Is Online" :sortable="true" :filter="true">
        <template #filter="{ filterCallback }">
          <InputText
            type="text"
            v-model="filters.online.value"
            @input="filterCallback()"
            class="p-column-filter"
          /> </template
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/init.js'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

export default {
  components: {
    DataTable,
    Column,
    Button,
    InputText
  },
  data() {
    return {
      users: [],
      sortField: null,
      sortOrder: null,
      filters: {
        isAustralian: { value: null, matchMode: 'contains' }, // Define filter matchMode
        gender: { value: null, matchMode: 'contains' },
        email: { value: null, matchMode: 'contains' },
        reason: { value: null, matchMode: 'contains' },
        online: { value: null, matchMode: 'contains' }
      }
    }
  },
  async mounted() {
    await this.getUsers()
    this.observeDomChanges()
  },
  methods: {
    async getUsers() {
      const querySnapshot = await getDocs(collection(db, 'users'))

      const data = []
      querySnapshot.forEach((doc) => {
        const docData = doc.data()
        data.push({
          id: doc.id,
          email: docData.email,
          isAustralian: docData.isAustralian,
          reason: docData.reason,
          gender: docData.gender,
          suburb: docData.suburb,
          online: docData.online
        })
      })
      this.users = data
    },
    observeDomChanges() {
      const targetNode = document.body // Observe the body for DOM changes
      const config = { childList: true, subtree: true } // Watch for added or removed child elements

      const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            this.addClearButtonListeners() // Try adding event listeners when child nodes change
          }
        }
      }

      const observer = new MutationObserver(callback)
      observer.observe(targetNode, config)
    },
    addClearButtonListeners() {
      // Select all built-in clear buttons
      const clearButtons = document.querySelectorAll('.p-datatable-filter-clear-button')

      clearButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          this.clearFilters()
        })
      })
    },
    clearFilters() {
      this.filters.email.value = null
      this.filters.isAustralian.value = null
      this.filters.gender.value = null
      this.filters.reason.value = null
      this.filters.online.value = null
    },
    exportCSV() {
      if (this.$refs.dt) {
        this.$refs.dt.exportCSV()
      }
    }
  }
}
</script>
