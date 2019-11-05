export class ModalService {
  public modals: any[] = [];
  public isLoginModalOpen = false;
  public isSignUpModalOpen = false;


  public add(modal: any): void {
      this.modals.push(modal);
  }

  public remove(id: string): void {
      this.modals = this.modals.filter(x => id !== x);
  }

  public open(id: string): void {
    id === 'login' ? this.isLoginModalOpen = true : this.isSignUpModalOpen = true;
  }

  public close(id: string): void {
    id === 'login' ? this.isLoginModalOpen = false : this.isSignUpModalOpen = false;
  }
}
