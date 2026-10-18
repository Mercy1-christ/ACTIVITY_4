const API = 'http://localhost:3000/api/campaigns';

async function load(){
  try {
    const res = await fetch(API);
    const data = await res.json();
    document.getElementById('tbl').innerHTML = data.map(r=>`
      <tr>
        <td>${r.id}</td>
        <td>${r.campaign_name}</td>
        <td>${r.cause||''}</td>
        <td>${r.location||''}</td>
        <td>K${r.target_amount||0}</td>
        <td>${r.status}</td>
        <td><button onclick="edit(${r.id})">Edit</button> <button onclick="del(${r.id})">Delete</button></td>
      </tr>`).join('');
  } catch(e) {
    document.getElementById('tbl').innerHTML = `<tr><td colspan=7 style="color:red">Backend not running! Run npm start in backend terminal</td></tr>`;
  }
}

document.getElementById('form').addEventListener('submit', async e=>{
  e.preventDefault();
  const payload={
    campaign_name:document.getElementById('campaign_name').value,
    cause:document.getElementById('cause').value,
    description:document.getElementById('description').value,
    location:document.getElementById('location').value,
    organizer:document.getElementById('organizer').value,
    start_date:document.getElementById('start_date').value,
    target_amount:Number(document.getElementById('target_amount').value),
    status:document.getElementById('status').value
  };
  const id=document.getElementById('id').value;
  if(id){
    await fetch(`${API}/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  }else{
    await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  }
  resetForm(); load();
});

async function edit(id){
  const r = await (await fetch(`${API}/${id}`)).json();
  document.getElementById('id').value = r.id;
  document.getElementById('campaign_name').value = r.campaign_name||'';
  document.getElementById('cause').value = r.cause||'';
  document.getElementById('description').value = r.description||'';
  document.getElementById('location').value = r.location||'';
  document.getElementById('organizer').value = r.organizer||'';
  document.getElementById('start_date').value = r.start_date||'';
  document.getElementById('target_amount').value = r.target_amount||'';
  document.getElementById('status').value = r.status||'Active';
}

async function del(id){
  if(confirm('Delete this campaign?')){
    await fetch(`${API}/${id}`,{method:'DELETE'});
    load();
  }
}

function resetForm(){
  document.getElementById('form').reset();
  document.getElementById('id').value='';
}

load();