<template>
  <div>
    <!-- Header Section -->
    <section class="header">
      <div class="container">
        <h1>Caregivers</h1>
        <div>
          <DataTable
            :value="tableData"
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
            <Column
              field="caregiverName"
              header="Caregiver Name"
              :sortable="true"
              :filter="true"
              style="min-width: 12rem"
            >
              <template #filter="{ filterCallback }">
                <InputText
                  type="text"
                  v-model="filters.caregiverName.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                /> </template
            ></Column>
            <Column
              field="contact"
              header="Contact"
              :sortable="true"
              filter
              filterPlaceholder="Search by contact"
            >
              <template #filter="{ filterCallback }">
                <InputText
                  type="text"
                  v-model="filters.contact.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                /> </template
            ></Column>
            <Column
              field="specialty"
              header="Specialty"
              :sortable="true"
              filter
              filterPlaceholder="Search by specialty"
            >
              <template #filter="{ filterCallback }">
                <InputText
                  type="text"
                  v-model="filters.specialty.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                /> </template
            ></Column>
          </DataTable>
        </div>
      </div>
    </section>
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
      tableData: [],
      sortField: null,
      sortOrder: null,
      filters: {
        caregiverName: { value: null, matchMode: 'contains' },
        contact: { value: null, matchMode: 'contains' },
        specialty: { value: null, matchMode: 'contains' }
      }
    }
  },
  async mounted() {
    await this.fetchData()
    this.observeDomChanges()
  },
  methods: {
    async fetchData() {
      const querySnapshot = await getDocs(collection(db, 'Caregivers'))

      const data = []
      querySnapshot.forEach((doc) => {
        const docData = doc.data()
        data.push({
          id: doc.id,
          caregiverName: docData.CaregiverName,
          contact: docData.Contact,
          specialty: docData.Specialty
        })
      })
      this.tableData = data
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
          // Handle clearing the filters
          this.clearFilters()
        })
      })
    },
    clearFilters() {
      this.filters.caregiverName.value = null
      this.filters.contact.value = null
      this.filters.specialty.value = null
    },
    exportCSV() {
      if (this.$refs.dt) {
        this.$refs.dt.exportCSV()
      }
    }
  }
}
</script>
