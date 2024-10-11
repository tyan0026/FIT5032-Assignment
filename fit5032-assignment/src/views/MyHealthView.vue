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
            filterDisplay="row"
          >
            <Column
              field="caregiverName"
              header="Caregiver Name"
              :sortable="true"
              :filter="true"
              style="min-width: 12rem"
            ></Column>
            <Column
              field="contact"
              header="Contact"
              :sortable="true"
              filter
              filterPlaceholder="Search by contact"
            ></Column>
            <Column
              field="specialty"
              header="Specialty"
              :sortable="true"
              filter
              filterPlaceholder="Search by specialty"
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

export default {
  components: {
    DataTable,
    Column
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
    }
  }
}
</script>
