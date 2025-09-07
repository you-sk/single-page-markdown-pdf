window.onload = () => {
    const markdownInput = document.getElementById('markdownInput');
    const fileInput = document.getElementById('fileInput');
    const createPdfButton = document.getElementById('createPdfButton');
    const pdfContentArea = document.getElementById('pdf-content-area');
    const statusDiv = document.getElementById('status');

    // Check for library availability
    if (typeof marked === 'undefined' || typeof window.html2canvas === 'undefined' || typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        let missing = [];
        if (typeof marked === 'undefined') missing.push('marked.js');
        if (typeof window.html2canvas === 'undefined') missing.push('html2canvas');
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') missing.push('jsPDF');
        statusDiv.textContent = `エラー: 必要なライブラリ (${missing.join(', ')}) が読み込めませんでした。インターネット接続を確認するか、CDNのURLが正しいか確認してください。`;
        statusDiv.style.color = '#dc3545'; // Red for error
        createPdfButton.disabled = true;
        console.error("Missing libraries:", missing);
        return;
    }

    // Configure marked.js
    marked.setOptions({
        gfm: true, breaks: true, pedantic: false, sanitize: false,
        smartLists: true, smartypants: false
    });

    // File input handler
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            markdownInput.value = e.target.result;
            statusDiv.textContent = `ファイル「${file.name}」を読み込みました。`;
            statusDiv.style.color = '#28a745';
        };
        reader.onerror = () => {
            statusDiv.textContent = 'ファイルの読み込みに失敗しました。';
            statusDiv.style.color = '#dc3545';
        };
        reader.readAsText(file);
    });

    // PDF creation handler
    createPdfButton.addEventListener('click', async () => {
        const markdownText = markdownInput.value;
        if (!markdownText.trim()) {
            statusDiv.textContent = 'Markdownコンテンツが空です。入力してください。';
            statusDiv.style.color = '#ffc107';
            return;
        }

        statusDiv.textContent = 'PDFを生成中... しばらくお待ちください。';
        statusDiv.style.color = '#007bff';
        createPdfButton.disabled = true;

        try {
            // 1. Convert Markdown to HTML
            const htmlContent = marked.parse(markdownText);
            pdfContentArea.innerHTML = `<div style="font-family: 'Noto Sans JP', sans-serif; padding: 20px; background: white; line-height: 1.5; box-sizing: border-box; display: inline-block;">${htmlContent}</div>`;
            const elementToRender = pdfContentArea.firstChild;

            // 2. Render to canvas
            statusDiv.textContent = 'コンテンツを画像に変換中...';
            const canvas = await window.html2canvas(elementToRender, {
                scale: 2,
                useCORS: true,
                logging: false,
                width: elementToRender.scrollWidth,
                height: elementToRender.scrollHeight,
                windowWidth: elementToRender.scrollWidth,
                windowHeight: elementToRender.scrollHeight
            });

            // 3. Image data
            const imgData = canvas.toDataURL('image/jpeg', 0.98);
            statusDiv.textContent = 'PDFに変換中...';

            // 4. Initialize jsPDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            // 5. Fit image on page
            const imgProps = pdf.getImageProperties(imgData);
            const pdfPageWidth = pdf.internal.pageSize.getWidth();
            const pdfPageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const usableWidth = pdfPageWidth - margin * 2;
            const usableHeight = pdfPageHeight - margin * 2;
            const widthRatio = usableWidth / imgProps.width;
            const heightRatio = usableHeight / imgProps.height;
            const scaleRatio = Math.min(widthRatio, heightRatio);
            const finalImgWidth = imgProps.width * scaleRatio;
            const finalImgHeight = imgProps.height * scaleRatio;
            const posX = margin + (usableWidth - finalImgWidth) / 2;
            const posY = margin + (usableHeight - finalImgHeight) / 2;

            pdf.addImage(imgData, 'JPEG', posX, posY, finalImgWidth, finalImgHeight);

            // 6. Save PDF
            pdf.save('markdown-export.pdf');

            statusDiv.textContent = 'PDFが正常に作成され、ダウンロードが開始されました。';
            statusDiv.style.color = '#28a745';
        } catch (error) {
            console.error("PDF generation error:", error);
            statusDiv.textContent = `PDF生成中にエラーが発生しました: ${error.message}`;
            statusDiv.style.color = '#dc3545';
        } finally {
            createPdfButton.disabled = false;
        }
    });
};