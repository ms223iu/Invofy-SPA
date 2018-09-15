<template>
    <button :class="getButtonClass" @click="onClick()" :disabled="isLoading || disabled">{{text}}</button>
</template>

<script>
export default {
	props: ['type', 'href', 'safe', 'isLoading'],
	data() {
		return {
			text: '',

			safeInterval: null,
			safeTimeElapsed: 0,
			safeTimeConstant: 3,
			safeIsCanceling: false,
			safeConfirmed: false,
			disabled: false
		}
	},

	beforeMount() {
		this.text = this.getChildren();
	},

	beforeDestroy() {
		clearInterval(this.safeInterval);
	},

	computed: {
		getButtonClass() {
			switch (this.type) {
				case 'success': return `button is-success ${this.isLoading ? 'is-loading' : ''}`
				case 'danger': return `button is-danger ${this.isLoading ? 'is-loading' : ''}`
				default: return `button is-success ${this.isLoading ? 'is-loading' : ''}`
			}
		}
	},

	methods: {
		getChildren() {
			return this.$slots.default.text || this.$slots.default[0].text;
		},

		onClick() {
			// If no safe prop was passed, just trigger onClick
			if(!this.safe) {
				this.$emit('onClick');
				return;
			}

			if(this.safe && this.safeConfirmed) {
				this.safeConfirmed = false;
				this.text = this.getChildren();
				this.safeTimeElapsed = 0;
				clearInterval(this.safeInterval);
				this.$emit('onClick');
				return;
			}

			this.text = `Säker? (${this.safeTimeConstant})`;
			this.disabled = true;

			this.safeInterval = setInterval(() => {
				this.safeTimeElapsed++;

				if(this.safeTimeElapsed === this.safeTimeConstant) {
					this.disabled = false;
					this.safeConfirmed = true;
				}

				if(this.safeConfirmed && (this.safeTimeElapsed === this.safeTimeConstant*2)) {
					this.safeConfirmed = false;
					this.text = this.getChildren();
					this.safeTimeElapsed = 0;
					clearInterval(this.safeInterval);
					return;
				}

				if(this.safeConfirmed) {
					this.text = `Ta bort (${(this.safeTimeConstant*2) - this.safeTimeElapsed})`
					return;
				}

				this.text = `Säker? (${this.safeTimeConstant - this.safeTimeElapsed})`;
			}, 1000);
		}
	}
}
</script>

<style>

</style>
