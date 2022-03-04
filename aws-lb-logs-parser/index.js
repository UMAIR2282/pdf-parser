const fs = require("fs");
const path = "data/";

const filesArray = fs
  .readdirSync(path)
  .filter((file) => fs.lstatSync(path + file).isFile());

const parseUrl = (lineData) => {
  const data = { url: null, method: null };
  const methods = ["OPTIONS", "POST", "GET"];
  if (
    lineData !== undefined &&
    lineData !== null &&
    lineData.trim().length > 0
  ) {
    for (let i = 0; i < methods.length; i++) {
      let methodStr = '"' + methods[i] + " ";
      let idx = lineData.indexOf(methodStr);
      if (idx >= 0) {
        let urlData = lineData.substring(idx + methodStr.length);
        let idxSpace = urlData.indexOf(" ");
        if (idxSpace > 0) {
          urlData = urlData.substring(0, idxSpace);
          let idxQS = urlData.indexOf("?");
          if (idxQS > 0) {
            urlData = urlData.substring(0, idxQS);
          }
        }
        const splits = urlData.split("/");
        let url = "";
        for (let i = 0; i < splits.length; i++) {
          if (
            splits[i] !== undefined &&
            splits[i] !== null &&
            splits[i].trim().length > 0 &&
            parseInt(splits[i]) > 0
          ) {
            url += ":id/";
          } else {
            url += splits[i] + "/";
          }
        }
        data.url = url;
        data.method = methods[i];
        break;
      }
    }
  }
  return data;
};

const getKey = (str) => {
  return btoa(str);
};

const printUrls = (filesData) => {
  let totalCount = 0;
  let mainCount = 0;
  Object.keys(filesData).forEach((k) => {
    console.log({ file: filesData[k]["file"] });
    Object.keys(filesData[k]).forEach((u) => {
      if (u !== "file") {
        console.log("Url Count :: ", filesData[k][u]);
        try {
          if (filesData[k][u].count > 60) {
            fs.writeFileSync(
              path + "/" + k + ".csv",
              filesData[k][u].url + "," + filesData[k][u].count + "\n",
              { flag: "a+" }
            );
            mainCount += filesData[k][u].count;
          }
          //file written successfully
        } catch (err) {
          console.error(err);
        }
        totalCount += filesData[k][u].count;
      }
    });
  });
  console.log("Counts", totalCount, mainCount);
};

const parseFiles = async () => {
  const filesData = {};
  for (let i = 0; i < filesArray.length; i++) {
    let file = path + filesArray[i];
    let fileKey = getKey(file);
    try {
      let data = fs.readFileSync(file, "utf8");
      if (filesData[fileKey] === undefined || filesData[fileKey] === null) {
        filesData[fileKey] = { file: file };
      }
      while (data.indexOf("\n") > 0) {
        let returnIndex = data.indexOf("\n");
        if (returnIndex > 0) {
          let lineData = data.substring(0, returnIndex);
          let urlData = parseUrl(lineData);
          if (
            urlData.url !== undefined &&
            urlData.url != null &&
            urlData.url.trim().length > 0
          ) {
            let urlKey = getKey(urlData.url);
            if (
              filesData[fileKey][urlKey] === undefined ||
              filesData[fileKey][urlKey] === null
            ) {
              filesData[fileKey][urlKey] = {
                count: 0,
                url: urlData.url.trim(),
              };
            }
            filesData[fileKey][urlKey].count++;
          }
          data = data.substring(returnIndex + 1);
        } else {
          break;
        }
        if (data === undefined || data === null || data.trim().length <= 0) {
          break;
        }
      }
    } catch (err) {
      console.error("Error in File", file, err);
    }
  }
  printUrls(filesData);
};

parseFiles();
