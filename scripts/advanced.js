import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://xwximgdnlmajmgruypda.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3eGltZ2RubG1ham1ncnV5cGRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTM3MjMsImV4cCI6MjA4NTUyOTcyM30.lDUMUSKOTMYGCQ6u8r3GQMD0wqwK-5yf88savdDbvNo'
const supabase = createClient(supabaseUrl, supabaseKey);

let current = 0;
const steps = document.querySelectorAll(".step");

function nextStep() {
    steps[current].classList.remove("active");
    current++;
    steps[current].classList.add("active");
};

const buttons = document.querySelectorAll("button");

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function sendAnswers(stepName) {
    const form = document.querySelector(".step.active form");
    if (!form) return;

    const data = {};
    new FormData(form).forEach((value, key) => {
        data[key] = value;
    })

    const rows = Object.entries(data).map((question, answer) => ({
        step: stepName,
        question,
        answer
    }));

    const { error } = await supabase
    .from("responses")
    .insert(rows);

  if (error) {
    console.error("Supabase error:", error);
  }
}

buttons[0].addEventListener("click", () => {
    const text = document.querySelector("#hername").value;
    if (text.toLowerCase().includes("lucy")) {
        alert("Correct!");
        nextStep();
    } else {
        alert("WRONG!!!")
        document.querySelector("#hername").value = "";
    }
})

buttons[1].addEventListener("click", () => {
    const text = document.querySelector("#myname").value;
    if (text.toLowerCase().includes("dan")) {
        alert("Correct!");
        nextStep();
    } else {
        alert("WRONG!!!")
        document.querySelector("#myname").value = "";
    }
})

buttons[2].addEventListener("click", nextStep);

function isRadioSelected(groupName) {
  return document.querySelector(`input[name="${groupName}"]:checked`);
}

buttons[3].addEventListener("click", () => {
    const radio = isRadioSelected("attire");
    if (!radio){
        alert("select an option");
        return;
    }

    if (radio.value == "flip") {
        document
            .querySelectorAll('input[name="attire"]')
            .forEach(r => r.checked = false);
        if (randInt(0, 1)) {
            document.querySelector('input[name="attire"][value="formal"]').checked = true;
        } else {
            document.querySelector('input[name="attire"][value="casual"]').checked = true;
        }
    }
    sendAnswers(current);
    nextStep();
})

buttons[4].addEventListener("click", () => {
    const radio = isRadioSelected("dinner");
    if (!radio){
        alert("select an option");
        return;
    }

    if (radio.value == "flip") {
        document
            .querySelectorAll('input[name="dinner"]')
            .forEach(r => r.checked = false);
        if (randInt(0, 1)) {
            document.querySelector('input[name="dinner"][value="restaurant"]').checked = true;
        } else {
            document.querySelector('input[name="dinner"][value="homecooked"]').checked = true;
        }
    }
    sendAnswers(current);
    nextStep();
})

buttons[5].addEventListener("click", () => {
    const radio = isRadioSelected("cuisine");
    if (!radio){
        alert("select an option");
        return;
    }

    if (radio.value == "flip") {
        document
            .querySelectorAll('input[name="cuisine"]')
            .forEach(r => r.checked = false);
        const num = randInt(0, 5);
       const options = ["italian","indian","chinese","thai","japanese","brg"];
        document.querySelector(`input[name="cuisine"][value="${options[num]}"]`).checked = true;
    }
    sendAnswers(current);
    nextStep();
})

buttons[6].addEventListener("click", () => {
    const radio = isRadioSelected("activity");
    sendAnswers(current);
    nextStep();
})

buttons[7].addEventListener("click", () => {
    sendAnswers(current);
    nextStep();
})

buttons[8].addEventListener("click", () => {
    nextStep();
})