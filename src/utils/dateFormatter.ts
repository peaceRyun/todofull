export interface FormattedDate {
    year: number;
    monthName: string;
    day: number;
}

export function formatMonthDayYear(): FormattedDate {
    const dateToFormat: Date = new Date();

    const year: number = dateToFormat.getFullYear();
    const day: number = dateToFormat.getDate();

    const monthName: string = dateToFormat.toLocaleDateString('en-US', { month: 'long' });

    return {
        year: year,
        monthName: monthName,
        day: day,
    };
}
