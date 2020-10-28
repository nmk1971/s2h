export function getRoute(question, direction): string {
    switch (direction) {
        case 'next': {
            switch (question.nextQuestionType) {
                case 'QCM': return `/response/qcm/${question.next}`;
                case 'QCU': return `/response/qcu/${question.next}`;
                case 'INPUT': return `/response/input/${question.next}`;
                case 'ORDERING': return `/response/ordering/${question.next}`;
            }
            break;
        }
        case 'previous': {
            switch (question.previousQuestionType) {
                case 'QCM': return `/response/qcm/${question.previous}`;
                case 'QCU': return `/response/qcu/${question.previous}`;
                case 'INPUT': return `/response/input/${question.previous}`;
                case 'ORDERING': return `/response/ordering/${question.previous}`;
            }
        }
    }
}
