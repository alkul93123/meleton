import Permissions from './permissions'

class Identity {
    constructor(user) {
        if (!user) {
            this.isGuest = true
            return;
        }

        this.isGuest = false

        this.user = user
        this.quite = false

        this.permissions = this.user.permissions ? this.user.permissions : []
    }

    /**
     * После вызоыва не будет выбрасываться исключения связанные с несуществующей ролью и т.д.
     * Просто будет возвращать false если роли или правила не существует
     *
     */
    quietMode() {
        this.quiet = true
    }

    /**
     * Получить разрешение на то или иное действие пользователя.
     *
     * @param string rule Параметр роли в формате 'category.rule'
     * например: 'orders.create' | 'orders.update' | 'orders.nextStep'
     *
     * @return bool
     */
    can(rule, quiet = false) {
      return this.hasRule(rule)
    }

    /**
     * Проверить существование правила
     *
     * @param string rule Параметр роли в формате 'category.rule'
     * например: 'orders.create' | 'orders.update' | 'orders.nextStep'
     *
     * @return bool
     */
    hasRule(rule) {
      let permission = this.permissions.find(item => item == rule)

      if (!permission) {
        return false
      }

      return true
    }


    setUser(user) {
      this.user = user
      this.permissions = this.user.permissions ? this.user.permissions : []
    }

    deauth() {
      this.isGuest = true
      this.user = {}
      this.permissions = {}
    }
}

export default Identity
