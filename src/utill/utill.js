export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid Date';

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else if (days < 7) {
        return `${days}일 전`;
    } else {
        return formatDate(date, 'YYYY-MM-DD HH:mm');
    }
}

export function formatNumber(num) {
    return new Intl.NumberFormat('ko-KR').format(num);
}

export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function modalheader({ headerTitle, setModalClose }) {
    return (
        <div className="modal-header">
            <h3 className="modal-title">{headerTitle}</h3>
            <button
                className="modal-close"
                onClick={() => setModalClose(false)}
            >
                ×
            </button>
        </div>
    );
}




export const storage = {
    set(key, value) {
        try {
            localStorage.setItem(`metallm_${key}`, JSON.stringify(value));
        } catch (err) {
            console.error('Storage set error:', err);
        }
    },
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`metallm_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (err) {
            console.error('Storage get error:', err);
            return defaultValue;
        }
    },
    remove(key) {
        try {
            localStorage.removeItem(`metallm_${key}`);
        } catch (err) {
            console.error('Storage remove error:', err);
        }
    },
    clear() {
        try {
            Object.keys(localStorage)
                .filter(k => k.startsWith('metallm_'))
                .forEach(k => localStorage.removeItem(k));
        } catch (err) {
            console.error('Storage clear error:', err);
        }
    }
};

