let defaultPermissions = {
  main: {
    view: true
  },
  policies: {
    pages: {
      index: true,
      view: true
    },
    actions: {
      view: true,
      printPolice: true,
      printContract: true,
      take: true,
      cancellation: true,
    },
    additional: {
      onlyOwnChildren: false,
    }
  },
  drafts: {
    pages: {
      index: true,
      view: true
    },
    actions: {
      view: true,
      take: true,
      viewLogs: true,
    },
    additional: {
      onlyOwnChildren: false,
    }
  },
  agents: {
    pages: {
      index: true,
      view: true,
      edit: true,
      subagents: true,
      paidouts: true,
      withdraws: true,
      bets: true,
    },
    actions: {
      block: true,
    },
    additional: {
      onlyOwnChildren: false,
    }
  },
  curators: {
    pages: {
      index: true,
      view: true,
      edit: true,
      create: true,
    },
    actions: {
      block: true,
      manuallyChangePassword: true,
    },
    additional: {
      onlyOwnChildren: false,
    }
  },
  administrators: {
    pages: {
      index: true,
      view: true,
      edit: true,
      create: true,
    },
    actions: {
      block: true,
      manuallyChangePassword: true,
    },
    additional: {
      onlyOwnChildren: false,
    }
  },
  bets: {
    common: {
      pages: {
        index: true,
      },
      actions: {
        edit: true
      }
    },
    individual: {
      pages: {
        index: true,
      },
      actions: {
        edit: true
      }
    }
  },
  payments: {
    pages: {
      index: true,
    },
    actions: {
      pay: true
    }
  },
  withdraws: {
    pages: {
      index: true,
    },
    actions: {
      confirmWithdraw: true
    }
  },
  notifications: {
    pages: {
      index: true,
      edit: true,
      create: true,
    },
    actions: {
      confirmWithdraw: true
    }
  },
  manuals: {
    cars: {
      pages: {
        index: true,
        edit: true,
      },
      actions: {
        confirmWithdraw: true
      }
    },
    insurances: {
      pages: {
        index: true,
        edit: true
      },
      actions: {
        turn: true
      }
    }
  },
  support: {
    pages: {
      index: true,
      view: true,
    },
    additional: {
      onlyOwnChildren: true
    }
  },
  settings: {
    roles: {
      pages: {
        index: true,
        create: true,
      },
      actions: {
        changeRoles: true,
      }
    }
  },
  systemControl: {
    main: {
      pages: true,
    },
    queues: {
      pages: {
        index: true,
        view: true
      }
    },
    actions: {
      reload: true,
      stop: true,
      start: true,
    }
  }
}

export default {
    // admin: {
    //     orders: JSON.parse(JSON.stringify(defaulOrderPermissions)),
    // },
    // operator: {
    //     orders: Object.assign(JSON.parse(JSON.stringify(defaulOrderPermissions)), {
    //         delete: false,
    //         previousStep: false,
    //     }),
    // },
    // courier: {
    //     orders: Object.assign(JSON.parse(JSON.stringify(defaulOrderPermissions)), {
    //         accessibly: false,
    //     }),
    // },
    // user: {
    //     orders: Object.assign(JSON.parse(JSON.stringify(defaulOrderPermissions)), {
    //         accessibly: false,
    //     }),
    // },
}
