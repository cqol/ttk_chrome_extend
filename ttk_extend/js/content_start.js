var taotaosou = {
    extension: {
    }
};

taotaosou.extension.addInstalledFlag = function () {
    sessionStorage.isInstalledTaotaoExtension = true;
};

taotaosou.extension.deleteInstalledFlag = function () {
    sessionStorage.isInstalledTaotaoExtension = false;
};

(function () {
    // 设置已经安装过插件的Flag
    taotaosou.extension.addInstalledFlag();
    // 设置5秒后删除Flag
    setTimeout(taotaosou.extension.deleteInstalledFlag, 5000);
})();
