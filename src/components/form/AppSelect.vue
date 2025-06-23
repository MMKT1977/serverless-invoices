<template>
  <div class="form-group multiselect--form-control">
    <label :for="field" v-if="label">{{ label }}</label>
    <Multiselect
      :id="field"
      :options="options"
      :track-by="trackBy"
      :disabled="disabled"
      :label="labelField"
      :allow-empty="allowEmpty"
      :custom-label="customLabel"
      :deselect-label="deselectLabel"
      :select-label="selectLabel"
      :selected-label="selectedLabel"
      :preserve-search="true"
      @input="$emit('input', $event)"
      @search-change="$emit('search-change', $event)"
      :value="value"
      :placeholder="placeholder"
      :loading="loading"
      :class="{
        'is-invalid': errors && errors.has(field)
      }"
      :multiple="multiple"
    >
      <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
        <slot :name="name" v-bind="slotData"/>
      </template>
    </Multiselect>
    <AppError v-if="errors" :errors="errors" :field="field"/>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import AppError from '@/components/form/AppError';

export default {
  name: 'AppSelect',
  components: {
    AppError,
    Multiselect,
  },
  props: {
    errors: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Object, Array],
      default: null,
    },
    field: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    trackBy: {
      type: String,
      default: 'id',
    },
    labelField: {
      type: String,
      default: 'name',
    },
    customLabel: {
      type: Function,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Select option',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    allowEmpty: {
      type: Boolean,
      default: false,
    },
    deselectLabel: {
      type: String,
      default: '',
    },
    selectLabel: {
      type: String,
      default: '',
    },
    selectedLabel: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.multiselect--form-control {
  .multiselect {
    min-height: 38px;

    &__tags {
      min-height: 38px;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
    }

    &__select {
      height: 36px;
    }

    &--active {
      .multiselect__tags {
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }
    }
  }

  .is-invalid .multiselect__tags {
    border-color: #dc3545;
  }
}
</style>
