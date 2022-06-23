let objects = [
    { login: 'Maks', email: 'maks@maks.com', company: 'METHED' },
    { login: 'Methed', email: 'info@methed.ru', company: 'METHED' },
    { login: 'Humidor', email: 'tomato@pomodoro.com', company: 'cucumber' }
]

const filter = (arr, keySearch, val) => {
    let result = [];
    arr.forEach(item => {
        for (const [key, value] of Object.entries(item)) {
            if (key === keySearch && value === val) {
                result.push(item);
            }
        }
    });
    return result;
};

export default filter;