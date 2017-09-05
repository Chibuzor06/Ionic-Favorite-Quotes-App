import { SettingsService } from './../../services/settings';
import { QuotePage } from './../quote/quote';
import { QuotesService } from './../../services/quotes';
import { Quote } from './../../data/quote.interface';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(
    private quotesService: QuotesService,
    private modalCtrl: ModalController,
    private settingsService: SettingsService
    // private menuCtrl: MenuController
  ){}
  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }
  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss(
      (remove: boolean) => {
        if(remove) {
          this.onRemoveFromFavorites(quote);
        }
      }
    );
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
    // this.quotes = this.quotesService.getFavoriteQuotes();
    const foundQuotePosition = this.quotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(foundQuotePosition, 1);
  }

  isAltBackground() {
    return this.settingsService.isUsingAltBackground();
  }
  // getBackground() {
  //   return this.settingsService.isUsingAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  // }

  // onOpenMenu() {
  //   this.menuCtrl.open();
  // }
}
