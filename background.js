var filepath = "";
var sStatus, dStatus, tStatus;

function updateBox() {
  chrome.storage.sync.get(
    {
      sBox: false,
      dBox: false,
      tBox: false
    },
    function(items) {
      console.log("Boxed = ", items.sBox);
      console.log("Date boxed = ", items.dBox);
      console.log("Turn off = ", items.tBox);

      sStatus = items.sBox;
      dStatus = items.dBox;
      tStatus = items.tBox;
    }
  );
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  updateBox();
});

chrome.downloads.onDeterminingFilename.addListener(function(item, __suggest) {
  function suggest(filename, conflictAction) {
    __suggest({
      filename: filename,
      conflictAction: conflictAction,
      conflict_action: conflictAction
    });
  }

  if (!tStatus) {
    if (sStatus) {
      filepath = "specific" + "/";
      console.log("Filepath 1 = ", filepath);
    }
    if (dStatus) {
      var d = new Date();
      var month = d.getMonth() + 1; // index starts at 0, so we have to add 1
      var year = d.getFullYear();

      filepath = filepath + month + "-" + year + "/";
      console.log("Filepath 2 = ", filepath);
    }
  }

  console.log("filepath 3 = ", filepath);
  suggest(filepath + item.filename, "uniquify");
  return;
});
