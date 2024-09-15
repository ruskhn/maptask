import { defineStore } from "pinia";

export enum Dialogs {
  NewTask = "newTaskDialog",
  ViewTask = "viewTaskDialog",
  FilterTask = "filterTaskDialog",
}

type DialogData = {
  isOpened: boolean;
  data?: {
    coordinates: any;
  };
};

interface DialogState {
  activeDialogs: Record<Dialogs, DialogData>;
}

export const useDialogStore = defineStore({
  id: "dialogStore",
  state: (): DialogState => ({
    activeDialogs: {
      [Dialogs.NewTask]: { isOpened: false },
      [Dialogs.ViewTask]: { isOpened: false },
      [Dialogs.FilterTask]: { isOpened: false },
    },
  }),
  actions: {
    openDialog(dialogName: Dialogs, data?: any) {
      for (const key in this.activeDialogs) {
        this.activeDialogs[key as Dialogs].isOpened = false;
        delete this.activeDialogs[key as Dialogs].data;
      }

      if (data) this.activeDialogs[dialogName].data = data;
      this.activeDialogs[dialogName].isOpened = true;
    },
    closeDialog(dialogName: Dialogs) {
      this.activeDialogs[dialogName].isOpened = false;
      delete this.activeDialogs[dialogName].data;
    },
    isDialogOpen(dialogName: Dialogs): boolean {
      return !!this.activeDialogs[dialogName].isOpened;
    },
    setDialogData(dialogName: Dialogs, data?: any) {
      this.activeDialogs[dialogName].data = data;
    },
  },
});
