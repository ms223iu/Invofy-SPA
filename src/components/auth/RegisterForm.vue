<template>
  <div>
    <b-field label="...">
      <b-input type="text" size="is-medium" ref="username" pattern=".{4,}" required></b-input>
    </b-field>
  
    <b-field label="...">
      <b-input type="password" size="is-medium" pattern=".{8,}" required></b-input>
    </b-field>

    <b-field label="...">
      <b-input type="password" size="is-medium" pattern=".{8,}" required></b-input>
    </b-field>

    <a class="button is-info mt-2 is-centered is-medium is-active" disabled>Skapa ett konto (Ej implementerad)</a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.button {
  width: 100%;
}
</style>
