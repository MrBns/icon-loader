import "./style.css";

main: {
  const inputArea = document.getElementById("input-area") as HTMLTextAreaElement;
  const outputAre = document.getElementById("output-area") as HTMLTextAreaElement;
  const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement;
  const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement;
  const reParseBtn = document.getElementById("reParseBtn") as HTMLButtonElement;
  ('<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 8h-3V6.21c0-2.61-1.91-4.94-4.51-5.19A5.008 5.008 0 0 0 7 6v2H4v14h16zm-8 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2M9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2z" /></svg>');
  console.log(inputArea, outputAre);
  function parseString(str: string) {
    // prettier-ignore
    return str.replace(/'/gi, '"').replace(/\\"/gi, "\"").replace(/"/gi, '\\"').replace(/\n|\t/gi, "");
  }

  function checkBtnStatus() {
    if (outputAre.value === "") {
      copyBtn.disabled = true;
    } else {
      copyBtn.disabled = false;
    }

    if (inputArea.value === "" && outputAre.value === "") {
      clearBtn.disabled = true;
    } else {
      clearBtn.disabled = false;
    }

    if (inputArea.value === "") {
      reParseBtn.disabled = true;
    } else {
      reParseBtn.disabled = false;
    }
  }

  if (inputArea && outputAre) {
    inputArea.addEventListener("input", function () {
      outputAre.value = parseString(inputArea.value);
      checkBtnStatus();
    });
  }

  reParseBtn.addEventListener("click", function () {
    outputAre.value = "";
    setTimeout(() => {
      outputAre.value = parseString(inputArea.value);
      checkBtnStatus();
    }, 200);
  });

  copyBtn.addEventListener("click", function () {
    if (outputAre.value === "") return;
    navigator.clipboard
      .writeText(outputAre.value)
      .then(() => {
        outputAre.classList.add("ring", "border-green-400");
        outputAre.select();
        setTimeout(() => {
          outputAre.classList.remove("ring", "border-green-400");
          outputAre.selectionEnd = 0;
        }, 2000);
      })
      .catch((e) => e instanceof Error && alert(e.message));
  });

  clearBtn.addEventListener("click", function () {
    inputArea.value = "";
    outputAre.value = "";
    checkBtnStatus();
  });
}
