const drop = () => {
  //drag *
  //dragend *
  //dragenter - объект над dropArea
  //dragexit *
  //dragleave - объект за пределами dropArea
  //dragover - объект зависает над вкщзФкуф
  //dragstart *
  //drop - объект отправлен в dropArea

  // с * срабатывает на элементе, который перетаскиваем, не сработают в нашей задаче

  const fileInputs = document.querySelectorAll('[name="upload"]');

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const highlight = (item) => {
    item.closest('.file_upload').style.border = '5px solid yellow';
    item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, 0.7)';
  };
  const unhighlight = (item) => {
    item.closest('.file_upload').style.border = 'none';
    if (item.closest('.calc_form')) {
      item.closest('.file_upload').style.backgroundColor = '#fff';
    } else {
      item.closest('.file_upload').style.backgroundColor = '#ededed';
    }
  };

  //массив событий
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  //события разукрашивают область, где картинка
  ['dragenter', 'dragover'].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => highlight(input), false);
    });
  });
  //убирается цвет
  ['dragleave', 'drop'].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => unhighlight(input), false);
    });
  });

  fileInputs.forEach((input) => {
    input.addEventListener('drop', (e) => {
      //чтоб аватарка уже устанавливалась в профиле когда устанавливаешь новую
      //берём файлы, которые в drag&drop и перетаскиваем в input
      input.files = e.dataTransfer.files;
      let dots;
      const arr = input.files[0].name.split('.');

      arr[0].length > 6 ? (dots = '...') : (dots = '.');
      const name = arr[0].substring(0, 6) + dots + arr[1];
      input.previousElementSibling.textContent = name;
    });
  });
};

export default drop;
