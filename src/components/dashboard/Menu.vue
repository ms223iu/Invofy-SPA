<template>
  <aside class="menu">
  <p class="menu-label">Fakturor</p>
  <ul class="menu-list">
    <li><router-link to="/dashboard/invoice">Mina Fakturor</router-link></li>
    <li><router-link to="/dashboard/invoice/add">Ny Faktura</router-link></li>
  </ul>
  <p class="menu-label">Mottagare</p>
  <ul class="menu-list">
    <li><router-link to="/dashboard/address">Mina Mottagare</router-link></li>
    <li><router-link to="/dashboard/address/add">Ny Mottagare</router-link></li>
  </ul>
  <p class="menu-label">Inställningar</p>
  <ul class="menu-list">
    <li><router-link to="#">Mitt Företag</router-link></li>
  </ul>
</aside>
</template>

<script>
export default {};
</script>

<style>
/*.menu-list a.is-active {
  background-color: #4a4a4a;
}*/
</style>
