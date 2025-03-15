/**
 * ローカルストレージへの安全なアクセスを提供するヘルパークラス
 * サンドボックス環境などローカルストレージが使えない場合はメモリ内ストレージを使用
 */
class SafeStorage {
    private memoryStorage: Record<string, string> = {};
    private isLocalStorageAvailable: boolean;
  
    constructor() {
      this.isLocalStorageAvailable = this.checkLocalStorageAvailability();
    }
  
    /**
     * ローカルストレージが利用可能かチェック
     */
    private checkLocalStorageAvailability(): boolean {
      try {
        window.localStorage.setItem('test', 'test');
        window.localStorage.removeItem('test');
        return true;
      } catch (e) {
        console.warn('localStorage is not available, using in-memory storage instead.');
        return false;
      }
    }
  
    /**
     * 値を取得
     */
    getItem(key: string): string | null {
      if (this.isLocalStorageAvailable) {
        return window.localStorage.getItem(key);
      } else {
        return this.memoryStorage[key] || null;
      }
    }
  
    /**
     * 値を設定
     */
    setItem(key: string, value: string): void {
      if (this.isLocalStorageAvailable) {
        window.localStorage.setItem(key, value);
      } else {
        this.memoryStorage[key] = value;
      }
    }
  
    /**
     * 値を削除
     */
    removeItem(key: string): void {
      if (this.isLocalStorageAvailable) {
        window.localStorage.removeItem(key);
      } else {
        delete this.memoryStorage[key];
      }
    }
  
    /**
     * 全ての値をクリア
     */
    clear(): void {
      if (this.isLocalStorageAvailable) {
        window.localStorage.clear();
      } else {
        this.memoryStorage = {};
      }
    }
  }
  
  // シングルトンとしてインスタンスをエクスポート
  export const storage = new SafeStorage();