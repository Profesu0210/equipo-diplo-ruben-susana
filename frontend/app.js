const API_URL = "http://localhost:3000";

// listar los items
document.getElementById("btnItems").addEventListener("click", async () => {
  const response = await fetch(`${API_URL}/api/items`);
  const data = await response.json();
  const ul = document.getElementById("itemsList");
  ul.innerHTML = "";
  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.id} - ${item.nombre}`;
    ul.appendChild(li);
  });
});

// --- 2. Crear un item nuevo --- \
document.getElementById("btnCrear").addEventListener("click", async () => {
  const nombre = document.getElementById("itemName").value;
  const resp = await fetch(`${API_URL}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });
  document.getElementById("itemName").value = "";
  console.log(resp);
  alert("Item creado!");
});

// --- 3. Consultar API externa ---
document.getElementById("btnExternal").addEventListener("click", async () => {
  const response = await fetch(`${API_URL}/api/external`);
  const data = await response.json();
  document.getElementById("externalResponse").textContent = JSON.stringify(
    data,
    null,
    2
  );
});
