<template>
    <UModal>
        <UButton label="AP Note" color="neutral" variant="subtle" />
        <template #content>
  <div class="space-y-6 p-6">
    <h1 class="text-2xl font-bold">AP Notes</h1>
    
    <UForm>
      <!-- Reason for CoE Change -->
      <UFormField label="Reason for CoE Change" required>
        <UInput 
          v-model="reason" 
          placeholder="Enter the reason for CoE change"
          type="text"
        />
      </UFormField>

      <!-- Subjects & Trimesters -->
      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Number of subjects left to complete" required>
          <UInput 
            v-model="subjectsLeft" 
            type="number"
            min="0"
          />
        </UFormField>

        <UFormField label="Number of trimesters left to complete course" required>
          <UInput 
            v-model="trimestersLeft" 
            type="number"
            min="0"
          />
        </UFormField>

      </div>

      <!-- Dates -->
      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Date current CoE expires" required>
          <UInput 
            v-model="currentCoeExpiry" 
            type="date"
          />
        </UFormField>

        <UFormField label="New course finish date" required>
          <UInput 
            v-model="newFinishDate" 
            type="date"
          />
        </UFormField>
      </div>

      <!-- Supporting Documentation -->
      <UFormField label="Supporting Documentation" class="mt-6">
        <div class="space-y-3">
          <UCheckbox 
            v-model="docs.passport" 
            label="Copy of Passport & Visa" 
            required
          />
          <UCheckbox 
            v-model="docs.coeForm" 
            label="CoE Form" 
            required
          />
          <UCheckbox 
            v-model="docs.additional" 
            label="Additional Supporting Documentation & Student Statement" 
            required
          />
          <UCheckbox 
            v-model="docs.mapping" 
            label="Mapping of Subjects" 
            required
          />
        </div>
      </UFormField>
    </UForm>
   <div class="flex flex-col gap-4">
    <UTextarea v-model="formattedOutput" />
    <UButton class="self-end" @click="handleCopy">Copy</UButton>
   </div>
  </div>
</template>
  </UModal>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
const reason = ref('')
const subjectsLeft = ref(null)
const trimestersLeft = ref(null)
const currentCoeExpiry = ref('')
const newFinishDate = ref('')
const docs = ref({
  passport: false,
  coeForm: false,
  additional: false, 
  mapping: false
})

const formattedOutput = computed(() => {
  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'Not specified'
  const formatDocs = Object.entries(docs.value)
    .map(([key, value]) => `- ${key}: ${value ? '✓' : '✗'}`)
    .join('\n')

  return `Reason for CoE Change:
${reason.value || 'Not specified'}

Number of subjects left to complete: ${subjectsLeft.value || 'Not specified'}

Number of trimesters left to complete course: ${trimestersLeft.value || 'Not specified'}

Date current CoE expires: ${formatDate(currentCoeExpiry.value)}

New course finish date: ${formatDate(newFinishDate.value)}

Supporting Documentation:
${formatDocs}`
})
const { text, copy, copied, isSupported } = useClipboard()
const handleCopy = () => {
  copy(formattedOutput.value)
}
</script>