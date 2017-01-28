import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SaucerService } from '../saucers/saucer.service';
import { CommentService } from '../comments/comment.service';
import { RestaurantService } from '../restaurants/restaurant.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [SaucerService, CommentService, RestaurantService]
})
export class CommentsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private restaurantId: string;
  private saucerId: string;
  private saucer = {};
  private comments = [];
  private restaurant = {};
  private data = {};
  private success: boolean;
  private error: boolean;  

  constructor(
    private route: ActivatedRoute,
    private saucerService: SaucerService,
    private commentService: CommentService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.saucerId = params.saucerId;
        this.restaurantId = params.restaurantId;

        this.saucerService.getSaucer(this.saucerId)
          .then(response => this.saucer = response);

        this.commentService.getComments(this.saucerId)
          .then(response => this.comments = response);

        this.restaurantService.getRestaurant(this.restaurantId)
          .then(response => this.restaurant = response);
      }
    );
  }

  sendComment() {
    this.commentService.addComment(this.saucerId, this.data)
      .then(response => {
        this.comments.push(response);
        this.data = {};
        this.success = true;
        this.error = false;
      }).catch(response => {
        this.success = false;
        this.error = true;
        console.log(response);
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
