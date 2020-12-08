import {Observable} from "rxjs";
import {ComponentClass} from "react";

/*
//common scenario
export default RxComponent(MyComponent)
  {
    provider: MyService.get$(),
    //false result means update does not required
    map: from => (updateRequired ? {a: from.a, b: from.b} : false),
  }
);

//mapping can be omitted, this means
//  map: from => from
export default RxComponent(MyComponent, MyService.get$())

//complex scenario
class My extends RxComponent(React.Component) {
  subscriptions = [
    {
      provider: MyService.get$(this.props.config),
      map: from => from.data,
    }
  ];
}

//or

class My extends RxComponent(React.Component) {
  componentDidMount() {
    this.subscribe(
      {
        provider: MyService.get$(this.props.config),
        map: from => from.data,
      }
    );
  }
}
 */

interface fullSubscription {
  provider: Observable<any>;
  map: (any) => any;
}

type subscription = fullSubscription | Observable<any>;

const RxComponent = (target: ComponentClass,
                     ...subs: subscription[]): ComponentClass => class extends target {
  _active_subs = [];
  subscriptions = [];

  autoUnsub(subscription) {
    this._active_subs.push(subscription);
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount();

    this._active_subs.map(
      subscription => subscription && subscription.unsubscribe()
    );
  }

  private subscribe(...subs: subscription[]) {
    const setState = data => this.setState(data);

    subs.forEach(sub => {
      //convert observable only
      if (sub instanceof Observable) {
        sub = {
          provider: sub,
          map: data => data,
        };
      }

      //check
      if (!sub.provider) {
        return console.error('provider field not found', sub);
      }
      if (!sub.map) {
        return console.error('map field not found', sub);
      }

      //subscribe
      this.autoUnsub(sub.provider.subscribe(data => {
        const mappedData = (sub as fullSubscription).map(data);
        if (mappedData !== false) {
          setState(mappedData)
        }
      }));
    });
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    this.subscribe(...[...subs, ...this.subscriptions]);
  }
};

export default RxComponent;