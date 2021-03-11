export default {
  availableRules: [
    {
      id: 'common_settings',
      label: 'Общие',
      children: [
        {
          id: 'common_settings.switch_to_agent',
          label: 'Переключение к агентскому интерфейсу'
        }
      ]
    },
    {
      id: 'main',
      label: 'Главная',
      children: [
        {
          id: 'main.pages',
          label: 'Страницы',
          children: [ { id: 'view', label: 'Просмотр' } ]
        }
      ]
    },

    {
      id: 'policies',
      label: 'Полисы',
      children: [
        {
          id: 'policies.policies',
          label: 'Полисы',
          children: [
            {
              id: 'policies.policies.pages',
              label: 'Страницы',
              children: [
                { id: 'policies.policies.pages.main', label: 'Основная' },
                { id: 'policies.policies.pages.view', label: 'Просмотр' },
              ]
            },
            {
              id: 'policies.policies.actions',
              label: 'Действия',
              children: [
                { id: 'policies.policies.actions.print_police', label: 'Печать полиса' },
                { id: 'policies.policies.actions.print_contract', label: 'Печать заявления' },
                { id: 'policies.policies.actions.take', label: 'Забрать полис' },
                { id: 'policies.policies.actions.cancelation', label: 'Аннулирование' },
                { id: 'policies.policies.actions.export', label: 'Экспорт в файл' },
                { id: 'policies.policies.actions.give', label: 'Передача другому агенту' },
              ]
            },
            {
              id: 'policies.policies.limitations',
              label: 'Ограничения',
              children: [
                { id: 'policies.policies.limitations.onlyOwnChildren', label: 'Может видеть полисы только своих агентов' },
                { id: 'policies.policies.limitations.ownChildrenAndSubagents', label: 'Может видеть черновики своих субагентов и их субагентов' },
              ]
            },
          ]
        },
        {
          id: 'policies.drafts',
          label: 'Черновики',
          children: [
            {
              id: 'policies.drafts.pages',
              label: 'Страницы',
              children: [
                { id: 'policies.drafts.pages.index', label: 'Основная' },
                { id: 'policies.drafts.pages.view', label: 'Просмотр' },
                { id: 'policies.drafts.pages.calculates', label: 'Расчеты' },
                { id: 'policies.drafts.pages.calculate.view', label: 'Просмотр расчета' },
              ]
            },
            {
              id: 'policies.drafts.actions',
              label: 'Действия',
              children: [
                { id: 'policies.drafts.actions.take', label: 'Передать пользоветелю' },
                { id: 'policies.drafts.actions.viewLogs', label: 'Просмотр логов' },
              ]
            },
            {
              id: 'policies.drafts.limitations',
              label: 'Ограничения',
              children: [
                { id: 'policies.drafts.limitations.onlyOwnChildren', label: 'Может видеть черновики только своих субагентов' },
                { id: 'policies.drafts.limitations.ownChildrenAndSubagents', label: 'Может видеть черновики своих субагентов и их субагентов' },
              ]
            },
          ]
        },
      ]
    },

    {
      id: 'users',
      label: 'Пользователи',
      children: [
        {
          id: 'users.agents',
          label: 'Агенты',
          children: [
            {
              id: 'users.agents.pages',
              label: 'Страницы',
              children: [
                { id: 'users.agents.pages.index', label: 'Основная' },
                { id: 'users.agents.pages.view', label: 'Просмотр' },
                { id: 'users.agents.pages.edit', label: 'Редактирование' },
                { id: 'users.agents.pages.subagents', label: 'Просмотр субагентов' },
                { id: 'users.agents.pages.paidouts', label: 'Просмотр запрошенных средств' },
                { id: 'users.agents.pages.withdraws', label: 'Просмотр полученных средств' },
                { id: 'users.agents.pages.bets', label: 'Просмотр ставок' },
              ]
            },
            {
              id: 'users.agents.actions',
              label: 'Действия',
              children: [
                { id: 'users.agents.actions.block', label: 'Блокировка агента' },
              ]
            },
            {
              id: 'users.agents.limitations',
              label: 'Ограничения',
              children: [
                { id: 'users.agents.limitations.onlyOwnChildren', label: 'Только свои субагенты' },
                { id: 'users.agents.limitations.ownChildrenAndSubagents', label: 'Свои субагенты и их субагенты' },
                { id: 'users.agents.limitations.onlyOwnChildrenFromCurator', label: 'Только если агенты принадлежат куратору' },
                { id: 'users.agents.limitations.ownChildrenAndSubagentsFromCurator', label: 'Агенты и их субагенты, принадлежащие куратору' },
              ]
            },
          ]
        },
        {
          id: 'users.curators',
          label: 'Кураторы',
          children: [
            {
              id: 'users.curators.pages',
              label: 'Страницы',
              children: [
                { id: 'users.curators.pages.index', label: 'Основная' },
                { id: 'users.curators.pages.edit', label: 'Редактирование' },
              ]
            },
            {
              id: 'users.curators.actions',
              label: 'Действия',
              children: [
                { id: 'users.curators.actions.block', label: 'Блокировка куратора' },
                { id: 'users.curators.actions.manuallyChangePassword', label: 'Изменение пароля' },
                { id: 'users.curators.actions.changeRole', label: 'Изменение роли куратора' },
                { id: 'users.curators.actions.visibleRole', label: 'Видимость роли куратора' },
              ]
            },
          ]
        },
        {
          id: 'users.administrators',
          label: 'Администраторы',
          children: [
            {
              id: 'users.administrators.pages',
              label: 'Страницы',
              children: [
                { id: 'users.administrators.pages.index', label: 'Основная' },
                { id: 'users.administrators.pages.edit', label: 'Редактирование' },
              ]
            },
            {
              id: 'users.administrators.actions',
              label: 'Действия',
              children: [
                { id: 'users.administrators.actions.block', label: 'Блокировка администратора' },
                { id: 'users.administrators.actions.manuallyChangePassword', label: 'Изменение пароля' },
                { id: 'users.administrators.actions.changeRole', label: 'Изменение роли администратора' },
                { id: 'users.administrators.actions.visibleRole', label: 'Видимость роли администратора' },
              ]
            },
          ]
        },
        {
          id: 'users.widget_users',
          label: 'Пользователи виджета',
          children: [
            {
              id: 'users.widget_users.pages',
              label: 'Страницы',
              children: [
                { id: 'users.widget_users.pages.index', label: 'Основная' },
                { id: 'users.widget_users.pages.edit', label: 'Редактирование' },
              ]
            },
            {
              id: 'users.widget_users.actions',
              label: 'Действия',
              children: [
                { id: 'users.widget_users.actions.block', label: 'Блокировка пользователя' },
              ]
            },
          ]
        },
        { id: 'users.can_show_deleted', label: 'Может видеть удаленных пользователей' },
      ]
    },

    {
      id: 'bets',
      label: 'Ставки',
      children: [
        {
          id: 'bets.cities',
          label: 'По городам',
          children: [
            {
              id: 'bets.cities.pages',
              label: 'Страницы',
              children: [
                { id: 'bets.cities.pages.index', label: 'Основная' },
              ]
            },
            {
              id: 'bets.common.actions',
              label: 'Действия',
              children: [
                { id: 'bets.cities.actions.edit', label: 'Редактирование' },
                { id: 'bets.cities.actions.delete', label: 'Удаление' },
              ]
            },
          ]
        },
        {
          id: 'bets.common',
          label: 'Общие',
          children: [
            {
              id: 'bets.common.pages',
              label: 'Страницы',
              children: [
                { id: 'bets.common.pages.index', label: 'Основная' },
              ]
            },
            {
              id: 'bets.common.actions',
              label: 'Действия',
              children: [
                { id: 'bets.common.actions.edit', label: 'Редактирование' },
                { id: 'bets.common.actions.delete', label: 'Удаление' },
              ]
            },
          ]
        },
        {
          id: 'bets.individual',
          label: 'Индивидуальные',
          children: [
            {
              id: 'bets.individual.pages',
              label: 'Страницы',
              children: [
                { id: 'bets.individual.pages.index', label: 'Основная' },
              ]
            },
            {
              id: 'bets.individual.actions',
              label: 'Действия',
              children: [
                { id: 'bets.individual.actions.edit', label: 'Редактирование' },
              ]
            },
          ]
        },

      ]
    },

    {
      id: 'payments',
      label: 'Выплаты',
      children: [
        {
          id: 'payments.payFromBalance',
          label: 'Оплата с баланса',
          children: [
            {
              id: 'payments.payFromBalance.pages',
              label: 'Страницы',
              children: [
                { id: 'payments.payFromBalance.pages.index', label: 'Основная' },
              ]
            },
            {
              id: 'payments.payFromBalance.actions',
              label: 'Действия',
              children: [
                { id: 'payments.payFromBalance.actions.pay', label: 'Оплатить' },
                { id: 'payments.payFromBalance.actions.cancellation', label: 'Аннулирование' },
              ]
            },
          ]
        },
        {
          id: 'payments.withdraws',
          label: 'Выплаты',
          children: [
            {
              id: 'payments.withdraws.pages',
              label: 'Страницы',
              children: [
                { id: 'payments.withdraws.pages.index', label: 'Основная' },
              ]
            },
            {
              id: 'payments.withdraws.actions',
              label: 'Действия',
              children: [
                { id: 'payments.withdraws.actions.approve', label: 'Одобрение' },
                { id: 'payments.withdraws.actions.cancellation', label: 'Аннулирование' },
              ]
            },
          ]
        },
      ]
    },

    {
      id: 'notifications',
      label: 'Уведомления',
      children: [
        {
          id: 'notifications.pages',
          label: 'Страницы',
          children: [
            { id: 'notifications.pages.index', label: 'Основная' },
            { id: 'notifications.pages.edit', label: 'Создание/Редактирование' },
          ]
        },
        {
          id: 'notifications.actions',
          label: 'Действия',
          children: [
            { id: 'notifications.actions.view', label: 'Просмотр текста уведомления' },
            { id: 'notifications.actions.viewControl', label: 'Управление видимостью' },
          ]
        },
      ]
    },

    {
      id: 'manuals',
      label: 'Справочники',
      children: [
        {
          id: 'manuals.cars',
          label: 'Марки и модели',
          children: [
            {
              id: 'manuals.cars.pages',
              label: 'Страницы',
              children: [
                { id: 'manuals.cars.pages.index', label: 'Основная' },
                { id: 'manuals.cars.pages.edit', label: 'Редактирование' },
              ]
            },
          ]
        },
        {
          id: 'manuals.insurances',
          label: 'Страховые компании',
          children: [
            {
              id: 'manuals.insurances.pages',
              label: 'Страницы',
              children: [
                { id: 'manuals.insurances.pages.index', label: 'Основная' },
                { id: 'manuals.insurances.pages.edit', label: 'Редактирование' },
              ]
            },
            {
              id: 'manuals.insurances.actions',
              label: 'Действия',
              children: [
                { id: 'manuals.insurances.actions.turn', label: 'Включение/выключение' },
              ]
            },
          ]
        },
      ]
    },

    {
      id: 'support',
      label: 'Обращения',
      children: [
        {
          id: 'support.pages',
          label: 'Страницы',
          children: [
            { id: 'support.pages.index', label: 'Основная' },
            { id: 'support.pages.view', label: 'Просмотр' },
          ]
        },
        {
          id: 'support.limitations',
          label: 'Ограничения',
          children: [
            { id: 'support.limitations.onlyOwnChildren', label: 'Только агенты, принадлежащие куратору' },
          ]
        },
      ]
    },

    {
      id: 'settings',
      label: 'Настройки',
      children: [
        {
          id: 'settings.roles',
          label: 'Роли',
          children: [
            {
              id: 'settings.roles.pages',
              label: 'Страницы',
              children: [
                { id: 'settings.roles.pages.index', label: 'Основная' },
                { id: 'settings.roles.pages.edit', label: 'Создание/Редактирование роли' },
              ]
            },
            {
              id: 'settings.roles.actions',
              label: 'Действия',
              children: [
                { id: 'settings.roles.actions.edit', label: 'Редактирование разрешений' },
              ]
            },
          ]
        },
        {
          id: 'settings.telegram_notifications',
          label: 'Телеграм уведомления',
          children: [
            {
              id: 'settings.telegram_notifications.pages',
              label: 'Страницы',
              children: [
                { id: 'settings.telegram_notifications.pages.index', label: 'Основная' },
                { id: 'settings.telegram_notifications.pages.edit', label: 'Создание/Редактирование уведомления' },
              ]
            },
            {
              id: 'settings.telegram_notifications.actions',
              label: 'Действия',
              children: [
                { id: 'settings.telegram_notifications.actions.turn', label: 'Включение/выключение' },
              ]
            },
          ]
        },
      ]
    },

    {
      id: 'systemControl',
      label: 'Управление системой',
      children: [
        {
          id: 'systemControl.main',
          label: 'Основное',
          children: [
            {
              id: 'systemControl.main.pages',
              label: 'Страницы',
              children: [
                { id: 'systemControl.main.pages.index', label: 'Основная' },
                { id: 'systemControl.main.pages.edit', label: 'Редактирование роли' },
              ]
            },
          ]
        },
        {
          id: 'systemControl.queues',
          label: 'Очереди',
          children: [
            {
              id: 'systemControl.queues.pages',
              label: 'Страницы',
              children: [
                { id: 'systemControl.queues.pages.index', label: 'Основная' },
                { id: 'systemControl.queues.pages.view', label: 'Логи' },
              ]
            },
            {
              id: 'systemControl.queues.actions',
              label: 'Действия',
              children: [
                { id: 'systemControl.queues.actions.reload', label: 'Перезагрузка' },
                { id: 'systemControl.queues.actions.stop', label: 'Остановка' },
                { id: 'systemControl.queues.actions.start', label: 'Запуск' },
              ]
            },
          ]
        },
      ]
    },

    {
      id: 'history',
      label: 'История',
      children: [
        {
          id: 'history.userBalance',
          label: 'Изменение баланса пользователя',
          children: [
            {
              id: 'history.userBalance.pages',
              label: 'Страницы',
              children: [
                { id: 'history.userBalance.pages.index', label: 'Основная' },
                { id: 'history.userBalance.pages.add', label: 'Добавление записи' },
              ]
            },
          ]
        },
      ]
    },
  ]
}
