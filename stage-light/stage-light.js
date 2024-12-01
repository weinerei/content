
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    const h1 = document.createElement('h1');
    h1.textContent = 'Setup Spot';
    body.appendChild(h1);

    const lampDiv = document.createElement('div');
    lampDiv.className = 'lamp';
    lampDiv.id = 'lamp';
    body.appendChild(lampDiv);

    const form = document.createElement('form');

    const labels = ['Rot:', 'Grün:', 'Blau:'];
    const ids = ['red', 'green', 'blue'];
    ids.forEach((id, index) => {
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = labels[index];
        form.appendChild(label);

        const input = document.createElement('input');
        input.type = 'range';
        input.id = id;
        input.name = id;
        input.min = '0';
        input.max = '255';
        input.value = '255';
        input.oninput = updateLampColor;
        form.appendChild(input);

        form.appendChild(document.createElement('br'));
    });

    body.appendChild(form);
});

function updateLampColor() {
    const red = document.getElementById('red').value;
    const green = document.getElementById('green').value;
    const blue = document.getElementById('blue').value;
    const lamp = document.getElementById('lamp');
    lamp.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/update", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ red: red, green: green, blue: blue }));
}