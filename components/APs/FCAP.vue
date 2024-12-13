<template>
  <UModal :ui="{ content: 'max-h-[80vh] overflow-y-auto' }">
    <UButton label="FC Note" color="neutral" variant="subtle" />
    <template #content>
      <div class="space-y-6 p-6 flex flex-col">
        <h1 class="text-2xl font-bold mb-6">AP Note</h1>

        <div class="bg-gray-50 p-6 rounded-lg space-y-6">
          <!-- Reason for Application -->
          <UFormField label="Reason for Application" required>
            <UTextarea
              :rows="1"
              v-model="reasonForApplication"
              placeholder="Enter the reason for application"
              class="w-full"
            />
          </UFormField>

          <!-- Desired Outcome -->
          <UFormField label="Desired Outcome" required>
            <UTextarea
              :rows="1"
              v-model="desiredOutcome"
              placeholder="Enter the desired outcome"
              class="w-full"
            />
          </UFormField>

          <!-- Investigation Notes -->
          <UFormField label="Investigation" required>
            <UTextarea
              :rows="1"
              v-model="investigation"
              placeholder="Enter investigation notes"
              class="w-full"
            />
          </UFormField>

          <!-- Supporting Documentation -->
          <UFormField
            label="Supporting Documentation"
            description="Add documentation that has been provided"
          >
            <div class="space-y-4">
              <!-- Input with Add button -->
              <div class="flex gap-2">
                <UInput
                  v-model="newDocument"
                  placeholder="Enter document name"
                  class="flex-grow"
                  @keyup.enter="addDocument"
                />
                <UButton
                  icon="i-heroicons-plus"
                  color="primary"
                  variant="soft"
                  @click="addDocument"
                  :disabled="!newDocument"
                />
              </div>

              <!-- Documents List -->
              <ul v-if="documents.length" class="space-y-2">
                <li
                  v-for="(doc, index) in documents"
                  :key="index"
                  class="flex items-center gap-2 p-2 bg-[var(--ui-bg-elevated)] rounded-lg"
                >
                  <span class="flex-grow">{{ doc }}</span>
                  <UButton
                    icon="i-heroicons-pencil"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    @click="editDocument(index)"
                  />
                  <UButton
                    icon="i-heroicons-trash"
                    color="error"
                    variant="ghost"
                    size="sm"
                    @click="removeDocument(index)"
                  />
                </li>
              </ul>
            </div>
          </UFormField>

          <!-- Recommendation -->
          <UFormField label="Recommendation" required>
            <UInput
              v-model="recommendation"
              type="textarea"
              placeholder="Enter recommendation"
              class="w-full"
            />
          </UFormField>
        </div>
        <div class="flex gap-4">
          <UTextarea class="flex-grow" v-model="formattedOutput" />
          <UButton class="self-end" @click="handleCopy">Copy</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'  
const reasonForApplication = ref("");
const desiredOutcome = ref("");
const investigation = ref("");
const recommendation = ref("");
const newDocument = ref("");
const documents = ref([]);
const editingIndex = ref(-1);

const addDocument = () => {
  if (newDocument.value.trim()) {
    if (editingIndex.value >= 0) {
      documents.value[editingIndex.value] = newDocument.value;
      editingIndex.value = -1;
    } else {
      documents.value.push(newDocument.value);
    }
    newDocument.value = "";
  }
};

const editDocument = (index) => {
  newDocument.value = documents.value[index];
  editingIndex.value = index;
};

const removeDocument = (index) => {
  documents.value.splice(index, 1);
};

const formattedOutput = computed(() => {
  return `The student has submitted a formal complaint:

They are applying because:
${reasonForApplication.value}

Their desired outcome is:
${desiredOutcome.value}

Investigation:
${investigation.value}

Supporting Documentation provided:
${documents.value.length ? documents.value.join("\n") : "None provided"}

Recommendation:
${recommendation.value}`;
});
const { text, copy, copied, isSupported } = useClipboard()
const handleCopy = () => {
  copy(formattedOutput.value)
}
</script>
