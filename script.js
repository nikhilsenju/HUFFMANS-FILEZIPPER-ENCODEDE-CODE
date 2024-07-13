import { HuffmanCoder } from './huffman.js';

onload = function () {
    // Get references to elements
    const treearea = document.getElementById('treearea');
    const encodeButton = document.getElementById('encode');
    const decodeButton = document.getElementById('decode');
    const temptext = document.getElementById('temptext');
    const upload = document.getElementById('uploadedFile');

    const coder = new HuffmanCoder();

    upload.addEventListener('change', () => { 
        alert("File uploaded"); 
    });

    encodeButton.onclick = function () {
        const uploadedFile = upload.files[0];
        if (!uploadedFile) {
            alert("No file uploaded!");
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            const text = fileLoadedEvent.target.result;
            if (text.length === 0) {
                alert("Text cannot be empty! Upload another file!");
                return;
            }
            const [encoded, tree_structure, info] = coder.encode(text);
            downloadFile(`${uploadedFile.name.split('.')[0]}_encoded.txt`, encoded);
            treearea.style.marginTop = '2000px';
            temptext.innerText = info;
            temptext.style.color = 'red'; // Change text color to red
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };

    decodeButton.onclick = function () {
        const uploadedFile = upload.files[0];
        if (!uploadedFile) {
            alert("No file uploaded!");
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            const text = fileLoadedEvent.target.result;
            if (text.length === 0) {
                alert("Text cannot be empty! Upload another file!");
                return;
            }
            const [decoded, tree_structure, info] = coder.decode(text);
            downloadFile(`${uploadedFile.name.split('.')[0]}_decoded.txt`, decoded);
            treearea.style.marginTop = '2000px';
            temptext.innerText = info;
            temptext.style.color = 'red'; // Change text color to red
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };
};

function downloadFile(fileName, data) {
    const a = document.createElement('a');
    a.href = `data:application/octet-stream,${encodeURIComponent(data)}`;
    a.download = fileName;
    a.click();
}
