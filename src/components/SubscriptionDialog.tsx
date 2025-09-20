import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
  onSubscribe: (plan: string) => void;
}

const SubscriptionDialog = ({ open, onOpenChange, currentPlan, onSubscribe }: SubscriptionDialogProps) => {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Бесплатный',
      price: 0,
      period: '',
      features: [
        '10 сообщений в день',
        'Доступ к базовым персонажам',
        'Создание 1 персонажа',
        'Реклама в интерфейсе'
      ],
      popular: false,
      color: 'border-white/20'
    },
    {
      id: 'premium',
      name: 'Премиум',
      price: 299,
      period: '/месяц',
      features: [
        '500 сообщений в день',
        'Доступ ко всем персонажам',
        'Создание до 10 персонажей',
        'Без рекламы',
        'Приоритетная поддержка'
      ],
      popular: true,
      color: 'border-primary'
    },
    {
      id: 'pro',
      name: 'Профессиональный',
      price: 599,
      period: '/месяц',
      features: [
        'Безлимитные сообщения',
        'Доступ ко всем персонажам',
        'Создание до 50 персонажей',
        'Без рекламы',
        'API доступ',
        'Приоритетная поддержка',
        'Ранний доступ к новинкам'
      ],
      popular: false,
      color: 'border-purple-400'
    }
  ];

  const handleSubscribe = async () => {
    if (selectedPlan === currentPlan) {
      onOpenChange(false);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubscribe(selectedPlan);
      onOpenChange(false);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl glass-effect border-white/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center text-2xl">
            Выберите подписку
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            Разблокируйте полный потенциал AI-персонажей
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative character-card cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? `${plan.color} bg-white/10` 
                  : 'glass-effect border-white/20 hover:border-white/40'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="tech-gradient">Популярный</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-foreground">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-foreground">
                  {plan.price === 0 ? 'Бесплатно' : `₽${plan.price}`}
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
                
                {selectedPlan === plan.id && (
                  <div className="mt-4 p-2 rounded bg-primary/20 border border-primary/30">
                    <div className="flex items-center space-x-2 text-primary">
                      <Icon name="CheckCircle" size={16} />
                      <span className="text-sm">Выбрано</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col space-y-4 mt-6">
          <Button 
            onClick={handleSubscribe}
            disabled={isLoading || selectedPlan === currentPlan}
            className="tech-gradient text-lg py-3"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Обработка платежа...</span>
              </div>
            ) : selectedPlan === currentPlan ? (
              'Текущий план'
            ) : selectedPlan === 'free' ? (
              'Перейти на бесплатный план'
            ) : (
              `Подписаться на ${plans.find(p => p.id === selectedPlan)?.name}`
            )}
          </Button>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Безопасная оплата через YandexPay и банковские карты
            </p>
            <div className="flex justify-center items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>SSL защита</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="RefreshCw" size={12} />
                <span>Отмена в любое время</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;