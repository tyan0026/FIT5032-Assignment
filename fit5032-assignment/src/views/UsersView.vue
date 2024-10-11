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
      filterDisplay="row"
    >
      <Column field="email" header="Username"></Column>
      <Column
        field="isAustralian"
        header="Australian Resident"
        :sortable="true"
        :filter="true"
      ></Column>
      <Column field="gender" header="Gender" :sortable="true" :filter="true"></Column>
      <Column field="reason" header="Reason" :sortable="true" :filter="true"></Column>
    </DataTable>
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
      users: [],
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
    await this.getUsers()
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
          suburb: docData.suburb
        })
      })
      this.users = data
    }
  }
}
</script>
