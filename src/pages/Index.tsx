import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface Grade {
  id: string;
  subject: string;
  grades: (number | null)[];
  quarterGrade: number;
}

const Index = () => {
  const [grades, setGrades] = useState<Grade[]>([
    { id: '1', subject: 'Алгебра', grades: [4, 4, 5, 4, 4, 5, 4], quarterGrade: 4 },
    { id: '2', subject: 'Геометрия', grades: [4, 5, 4, 4, 5, 4, 4], quarterGrade: 4 },
    { id: '3', subject: 'Русский язык', grades: [5, 4, 4, 5, 4, 5, 4], quarterGrade: 4 },
    { id: '4', subject: 'Литература', grades: [4, 5, 4, 4, 5, 4, 5], quarterGrade: 4 },
    { id: '5', subject: 'Английский язык', grades: [5, 4, 4, 5, 5, 4, 4], quarterGrade: 4 },
    { id: '6', subject: 'История', grades: [4, 4, 4, 5, 4, 4, 5], quarterGrade: 4 },
    { id: '7', subject: 'Биология', grades: [5, 4, 5, 4, 4, 5, 4], quarterGrade: 4 },
    { id: '8', subject: 'География', grades: [4, 5, 4, 4, 5, 4, 5], quarterGrade: 4 },
    { id: '9', subject: 'Физика', grades: [4, 4, 5, 4, 4, 5, 4], quarterGrade: 4 },
    { id: '10', subject: 'Информатика', grades: [5, 5, 4, 5, 5, 4, 5], quarterGrade: 5 },
  ]);

  const [editingCell, setEditingCell] = useState<{ gradeId: string; index: number } | null>(null);
  const [editValue, setEditValue] = useState('');

  const schedule = [
    { date: '01.09', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '02.09', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '05.09', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '06.09', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '09.09', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '10.09', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '13.09', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '16.09', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '19.09', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '20.09', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '23.09', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '24.09', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '27.09', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '30.09', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '01.10', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '04.10', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '07.10', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '08.10', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '11.10', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '14.10', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '15.10', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '18.10', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '21.10', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
    { date: '22.10', lessons: ['Геометрия', 'Литература', 'Биология', 'География', 'Информатика'] },
    { date: '25.10', lessons: ['Алгебра', 'Русский язык', 'Английский язык', 'История', 'Физика'] },
  ];

  const handleCellClick = (gradeId: string, index: number, currentValue: number | null) => {
    setEditingCell({ gradeId, index });
    setEditValue(currentValue?.toString() || '');
  };

  const handleSaveGrade = () => {
    if (!editingCell) return;
    
    const newValue = parseInt(editValue);
    if (isNaN(newValue) || newValue < 2 || newValue > 5) {
      toast({
        title: 'Ошибка',
        description: 'Оценка должна быть от 2 до 5',
        variant: 'destructive',
      });
      return;
    }

    setGrades(grades.map(grade => {
      if (grade.id === editingCell.gradeId) {
        const newGrades = [...grade.grades];
        newGrades[editingCell.index] = newValue;
        return { ...grade, grades: newGrades };
      }
      return grade;
    }));

    setEditingCell(null);
    setEditValue('');
    toast({
      title: 'Готово',
      description: 'Оценка обновлена',
    });
  };

  const handleQuarterGradeChange = (gradeId: string, newValue: string) => {
    const value = parseInt(newValue);
    if (isNaN(value) || value < 2 || value > 5) return;

    setGrades(grades.map(grade => {
      if (grade.id === gradeId) {
        return { ...grade, quarterGrade: value };
      }
      return grade;
    }));

    toast({
      title: 'Готово',
      description: 'Четвертная оценка обновлена',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
            <Icon name="BookOpen" size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Электронный дневник
            </h1>
            <p className="text-muted-foreground mt-1">1 сентября - 25 октября • 1 четверть</p>
          </div>
        </div>

        <Tabs defaultValue="grades" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 h-12 bg-white shadow-md">
            <TabsTrigger value="grades" className="text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="GraduationCap" size={18} className="mr-2" />
              Оценки
            </TabsTrigger>
            <TabsTrigger value="quarter" className="text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Award" size={18} className="mr-2" />
              Четвертные
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grades" className="space-y-6 animate-fade-in">
            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-blue-500 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Расписание и оценки</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-primary/20">
                      <th className="text-left p-3 font-semibold text-foreground bg-gradient-to-r from-primary/10 to-secondary/10">
                        Предмет
                      </th>
                      {schedule.map((day, idx) => (
                        <th key={idx} className="text-center p-3 font-semibold text-sm text-foreground bg-gradient-to-r from-primary/10 to-secondary/10">
                          {day.date}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((grade, gradeIdx) => (
                      <tr key={grade.id} className={`border-b border-gray-200 hover:bg-primary/5 transition-colors ${gradeIdx % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                        <td className="p-3 font-medium text-foreground">{grade.subject}</td>
                        {grade.grades.map((g, idx) => (
                          <td key={idx} className="text-center p-2">
                            {editingCell?.gradeId === grade.id && editingCell?.index === idx ? (
                              <div className="flex items-center gap-1 justify-center">
                                <Input
                                  type="number"
                                  min="2"
                                  max="5"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-14 h-10 text-center font-semibold"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveGrade();
                                    if (e.key === 'Escape') {
                                      setEditingCell(null);
                                      setEditValue('');
                                    }
                                  }}
                                />
                                <Button
                                  size="sm"
                                  onClick={handleSaveGrade}
                                  className="h-10 px-3 bg-gradient-to-r from-primary to-secondary"
                                >
                                  <Icon name="Check" size={16} />
                                </Button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleCellClick(grade.id, idx, g)}
                                className={`w-10 h-10 rounded-lg font-bold text-white shadow-md transition-all hover:scale-110 hover:shadow-lg ${
                                  g === 5
                                    ? 'bg-gradient-to-br from-green-500 to-green-600'
                                    : g === 4
                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                                    : 'bg-gradient-to-br from-orange-500 to-orange-600'
                                }`}
                              >
                                {g || '-'}
                              </button>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="quarter" className="space-y-6 animate-fade-in">
            <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-lg flex items-center justify-center">
                  <Icon name="Trophy" size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Итоги 1 четверти</h2>
              </div>
              
              <div className="grid gap-4">
                {grades.map((grade, idx) => (
                  <div
                    key={grade.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                      grade.quarterGrade === 5
                        ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-300'
                        : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl text-white shadow-lg ${
                        grade.quarterGrade === 5
                          ? 'bg-gradient-to-br from-green-500 to-green-600'
                          : 'bg-gradient-to-br from-blue-500 to-blue-600'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{grade.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          Средний балл: {(grade.grades.reduce((a, b) => a + (b || 0), 0) / grade.grades.length).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min="2"
                        max="5"
                        value={grade.quarterGrade}
                        onChange={(e) => handleQuarterGradeChange(grade.id, e.target.value)}
                        className={`w-20 h-14 text-center text-2xl font-bold ${
                          grade.quarterGrade === 5
                            ? 'border-green-400 focus:border-green-500'
                            : 'border-blue-400 focus:border-blue-500'
                        }`}
                      />
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        grade.quarterGrade === 5
                          ? 'bg-gradient-to-br from-green-500 to-green-600'
                          : 'bg-gradient-to-br from-blue-500 to-blue-600'
                      }`}>
                        <Icon name="Edit" size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary to-secondary rounded-xl text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Award" size={32} />
                    <div>
                      <p className="text-sm opacity-90">Средний балл за четверть</p>
                      <p className="text-4xl font-bold">
                        {(grades.reduce((sum, g) => sum + g.quarterGrade, 0) / grades.length).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Всего предметов</p>
                    <p className="text-4xl font-bold">{grades.length}</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;