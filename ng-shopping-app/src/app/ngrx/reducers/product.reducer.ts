
import { Action, createReducer, on } from "@ngrx/store"
import { createProduct } from "../actions/products.action"
import { Product } from "../types/products.types"


const initialState: Product[] = [
    {id: '1', title: 'product 1', description: 'this is a product', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRIRFRUSEhIREhEREREREREQDxERGBQZGRgUGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQhJCs0NDE0NDQ0NDQ0NDQxNDQ0NDE0NDE0NDQ0NDQ0NDQxNDYxMTQ0NDQ0NDQ0NDQ0NDQxNP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EADoQAAIBAwIDBgQEBAUFAAAAAAECAAMEERIhBTFBBhNRYXGBIjJSkUKhscEHFGLhM3KC0fAjJEOy8f/EABkBAAMBAQEAAAAAAAAAAAAAAAEDBAIABf/EACYRAAICAgICAQQDAQAAAAAAAAABAhEDEiExBEFRE3GBkSNhoSL/2gAMAwEAAhEDEQA/APLUMkYFWhA0emSNBqVdl5GaVvxMiZBiUxsMjQqeKMu0dVb8RzzM06dUNOMpvNC3vivOVRy/JHPB8HT6Y+mULS/Dc5pJvHKVkzhRDTG0w2mNpnWCgWmNphtMQWGwag0o5kntiJfskGd5oVbcEbRbyUx0cClGzmykbTL1ehgwBSMUrEShToBpi0w2mPphszqA0x9ELpj6Z1nUBCRaIbTFpgsOoEJH0w6UieUk1AjpBZtQZXAh6VUiMaR8IwSB0wxtGpQ4gQIYcSPjMbEJTXMW8cSmGaXRp1L4mV2riBanAMIFFG5ZJeydVgZWeSMiRGpUTylZCPiSxEJwER0xSWYpxqkeaKZMGDizPJPZaDK0JK4MkHhMuJYR4UNKmqSV5uMhcol6lWKnynR8Lvs4BnKo2Zat6xQ+UohOibLj2+53S77xYmZw6/BABM1VcGUqSInBjBY+mTAj6YbBQqT4l+ncjEoYjgTEopjIzcSxXIMpskLERCuASewDRFohsRYmrF6gdMWiHVMy7a8OZiMjaBzS7NRxuTpGaKJ54kSk6erYhVmBWX4jMRnsby4dKL3CrUNzmu3Dlxymbw24Cy7ccQ25xM9nLgsxaKHIC7tFAmM6AEy5cXhMoscxsE0uRGWUG+CFRZFDiSIjaYwRfNom1aBdpIiDdgIKSC3KQ2IsSvVuQJVe/gc0jUcbL7sBK73A5TPq3hMhTBO8XLIOhhtmp3oilWKK+pIp+jE4LMcSMkDJCqh44kcyaQ2BiijmIQpgJI8so+ZVxC02m4yFyVl2jWZeRmhQ4qw5zKUx8xim0TyimdTbcXB5mbFvdBus4FWmjY3jIRk7RscnyKliO2Aj4lWwug4EvaI1SEODQPEWmE0R+7OM4OPHG0OwNWCCxwss0bR3+VGbzAOPvG7sg4IweoPOZ3XRv6cqtoNYUMtOqtrdVEx+F0hzmtVr6RJcsnJ0j0MEFGNsr8Txgic4bQsZq3NYtDWqjG8MZOKMTgskuTJNkVlZ6LZm7cnOwlbuhzjI5H7FywrpGdSsSecHc2uma6VQso3tYGGMpNmZYoqP9mZpkW2j1KoEo3F4OUa5pE8cbZG5uwsoNckyNU6jmDVgImU2yqGJLsasDzlRpaqVIEUiYvYY4/ANOcvI4AgP5ciQem0DZuNombiKVO7MUB1s5mIyWmMRJykjJq0hiPiEDCZiEgI5MIKJ5jhoMGShA0WKbwuZTU4lhHmkxUohA0OtWV8TsOz3YC5rlXq/9tROCS/+Oy/0p+H1bHoZpzS7BGDl0VezK1qrilSRqjczj5UX6mPJR6z1C14AqIDVbW+N1UkIPfmfyl2xtKFnTFKigRRzPN3b6mbmxnMdo+0yopGr4sHbMlyeVJ8R4LcPhx7krNeotuv4V9yT+pgLrtBRRQhK6V+VdgMTx697RVWJ+I49ekzP5irVYKCxLHCgZZmPgB1MV/JLt/6VJYYdL9I9Yv8At8iqQnMZ67ShwLjSVEL1KtJWZ20q9RFYKPInyM82/knLMgV3dTgqqmowPgdOcSTcKrDc0n9wB+8fiWju7ZPnmskdUqR7fY3yEZRlceKMGH5Q9W6zPANDodXxow5HDKR6ETe4X2wuKRAc9+nUOcuB/S/PPrmPU03ySPG0qiz1rWDJpVx1mHwjjNK4XVTbcY1I2zofMfvymgTHJJk7k4vktm4EZ6+0plwJUu7sAc51JHKTYetcgTNubwTOuLwnOJTdyYdgahLu7JzM1qhzLa2zMZN7QYmdjWjfQGm+Yf8Alcyr8pmhTudplm4peyutrLNGkBziFcGBNTeZNpJF80ARAPayxRfaCr3YUGZs3SKD225igX4gMmKdsZpHFa4tUhJAxQ+gmY2qMDHKwmRwZPTBiLVABokVjRa46jMKAOJNWkMdJqcA4Q1zcUrdQSHcazv8NMHLtnptn3IhuuztbdHrH8O+zSUaNO6qorXFVRUUuM90hGVVc8mI3J5746Tp6/EANQHIdYq5CLjkANgOWOgnH8d4joR8Hc56/lIpTcmejjxRiqKHabtIcsin1M834pxFnJySZY4pdNnBOde+qYlZh0+/WbhCuWdklxSLPD7Q1nCghRzZyGKoucZIAJO5ACgEkkAZJno9l2UooiZVnZh/hAg16gO4NVlyFGMHQuV6HX885zslZ6V74qGIbFNSNQepuCxHULkrjzb6gR3A7TUuHUqlR1Ne4rltFMn4de22rmUGxLdS2PDS9IkbdkP5UU0w3d0UUbIgACj26flOevuIW5JAqoTy2enjPqW2nH8T4nWunNSqxOpiQo2pqSeSr748fEmX7DsddVgNFJst8oqMtIt6Kdx74mkm+kZlJLt0aVwmRnIZTyJwyHyDDIJ8gZjXXDhzUBG+k/I3l5Qd1w64s6hSor0HBK74ak/iMj4WHlNCxvAw1EDKle8p5IRlyNx10E4yOm3TGOsFfkpWVc0mFakxR0OHQ7lD9JH4lP8AzfE72w7QJWphxhW5OuclW6j06gziuLUC2qsoAYamZVGFKE5KgeA6Shwi7KVAM/C+Fb35H7/rN450xeXHas7254oekz6l0W5mVi8YtKGRJllFJlunQEqUa2BGqXsw7Y6LSXJqM6qJn3N14Sm90TAM+ZyRznfQR3zJI0GjSLvOAvksq8t0gJkh4UXRmZG4yRq1q2BtMS6qsxMK9YkSKiKbN9lDuzFL2oRQWGkcpiLEniOonJDWyGJYt6LOcARlSafB3VWIbbPIznwBcga3DmXmNj1lYWZM6a/uEKaRudjKFtWUHpCraC6ToyGsmHQ7wlO1YcxN2rXXG+IBqq43nJv4A0vkzKdsS3Kes/w04GKVJ7ph/wBSt8KZ/DSU9PVv/UTiOz1mbivTpJvrbc/Sg3ZvYT2oIqIEUaVQBFA5BQMYic0vQ7DFdlDilXA855j2puckL5nrPQOLuQPY/pPKuOVs1G8pNBWyx8RMHiz7qPATNIw2PA/mJommXqZ6Dc+0pPtUOej7+mreVJcWSSknKj0PhdPSKaDfQigZ5NUIG58zkb+U4vtDxA167tklEPd0wfoUnf1Y5Y+bGd2lPqOeVx65GJ5rbj4kznGtQ3jzGZ0XZmSo7fsheUaBArIu/wD5woapTJ6Drp5bDfrvPUremKfxqUI07Pn4dJHPP7zyKz4dq5PgeBGSD/tN6ytHUBDU1LjZQpGPQ5lqTSr0eW5JyvtnTceuaFSk9CroqK2o6Fy5DkY1huSkbb854/URqFZkOTobBztrQjkR5qRO/q2mM/EftOJ7QJmu++dIUOxIGSQx/QiLyx4sowSdtM0qmAyooONAwWOpmB2JJ2HTPLrOVrJpZ1+hiB99p0tcle6B+ZaSA+uBOd4g+ajnxYfoJMnyVvo6ejU1KrfUqt9xHJj8Po/9Kl/kX9BLDUJYraPOcabKveSBMsNQjd1DTMlfeMVMtKkZkgpmuCocyLS0qSNVJzsNIql5NGjd1HFOYcZM5NFhDE6xkWEIiXjlY6MlRT0xSxojw6SDaOXzHBkYp1jKCBo4MgJITSZloMKpi1QQMmJpMw0EzJqYITo+xPA/5u5Sm3+Eg7ysfFARhP8AUcD0zNOSirYFFydI77+GXATSpG7cYqXAxTB5rRznP+o4PoBO1qptCKAMAAAAAADYADkJVvKukfeedOWzbZ6UI6pJHO8ffAM8o4sfjc+c9D49cn9Z5zfvl26zsaGzfFA7BBpz4n/n7zJ4rTxUPg2CPfn+eZr2Z+EeRI/OB4rb6k1D5lyfVes9FwvEq+546yVnd/Y3bHiGpKbE41KAxG5DjY7es5rjFsFqVAvyOxqUydjgnkR0O/5wXDbvTlCfhY8/pb+82alDWmWGUBwXXdkboffPn58xmVcFz5H4FxDVhSfjHQnGfMePpOip3bBssu+Pwlx+oxOJrWDAgIA423XJJ356RuMbcsw9LiNVF7pCV+pizO536Btl9AM+coWZpUyR+OnK0dVfcR05ZylNd8F3AcjPRACW9hj0mLTse+qU0+PBJr12YKjin8OSVBOjUCiqv9Sb/FBWFk6nvqgWnvn+YvMhAR+JKRBaq2OWA3TYcxbvuJKB3dt3gptvVrVcG5uqhB+NyclFGW0qDkaiSSSYqeRyGwxqHRT4lc66jvtgE8uW25x7k+2JzuCzbc3bYebHaW7xwMouMn5yOg8Je7OWep+9Py0/l83I/YftBBbOjUpaxs6amgVVUclAUegGI7R8RiZaQEWEC0MxgGhTMyQMmRjtIEwmBmkSY7GQzONCzEDIMZEGA4sBoi0EDEWmGMRPVFA5inBs5yPFiOBJSoQkhGAkppAbHjqYwEliaRhklM9R/hJQxTuKuN3qpTB8kXVj7vPLhPaP4c2+iyoE86jVXPprIB+yiJ8iVQ/I/wAZXP8AB1bVN8TN4jX2lis4y0xrnLeMg2PSUV2c5x19jjznAV23M7njbgK04S4O5MfjE5GEszsf8x/aWsylaONx1znHliXFnq4ncUeF5CrIzH4hYFcuoyvNh9P9o1pxFlU0yWZGwWUMQduRI5NjznQIwmbecMRjlTpbwA+E+3T2ip4XdxKMXkKql+ytrB+JHGeZU7H1wYalWqchVqgf01XA/IzNr2bJuQCPEEH+8r58M/cxDTXDK001a5NptK/EzDV9TNqc+/OVa990QEf1nn7CUFHl+UKtFjz2/WZ4DTZZ4dYvVbA2UH4nO4Xx9W8p2FCiqIqKMKo28/M+c5ayuXpHAJC9V/D9pvJehlDZx5ecfhcfXZP5EZJW+i4Wg2qQS1x4yLVF8RKCSybVoB3MkNPjGciFGZENcWZAtFqhMpjlpAtIVIOANk2MjrizIQBDB4swYkiDMs3FslmKD3inBMbRFphwsWiR7FdANMcJDqmYUUobAyrpi0mXRSj93DsZZSCme9dmqXd21qn0W9PP+YrqP5meLUaOpgvViFHqTgT3O3TSAByChfLAAG32k3ky4SK/EjdssOnw7758ZjcRcKp8pr12wv8Aec1xTJB3k3stRxnH7onIHKcuWnRcVXGcznSd5Tj6EZOwTgg5GxEu21wG25N1Hj6SsZAoBuMgjlg9ZTjm4skzYVkX9msgMHd1gvwjd/DovrKyXNQ9QB4gbyaUsbnn1MdLNx/yT4vE5uQXg/AnuqgQHcglnbJVFHWQ43wFrZ9D6TndWU5BE67sxcJRpVKn43JXPL4QJy3aDiBq1dZ3AyPvIXNuR6ekYxMjAEmgLYVRufvDWdoztgD4eZboJu29qqbAe/UxsMblyTZMqjx7MVOGv1wPeW6doQMc/ObRpjEHsJRCEYu0S5ckpqn0ZBt2iNEy9WrCCaqDHWTUimNoZZFgcybPtNWZoGzSOqSVcxMs6wKIMtFqkSJEiCw0E1RAwJkMzLZtIuqY7PK1NpYO8DNxB95FFoEUBorJThRSjLJnMispJpQku7EYMZHJnWdQQUxGdJEPJq+Z1go0ezVrruaCHl3isfRTqP6T2FNh75nm/YS21XGvGyU3I9SQv7n7T0lh08MSXM7lRdgjUbKt7UwB1/ec3e3HPn6TY4pUwNuvTr+U5G+u8E9PvFoorgxeKXA1HI5TAuKoJ2mjxhwd+cxSZVDomyPkfMmg8eUEDCK0ahZaD4Es07J3XXsq+LHEzWeEqXbsApPwgYA6QNv0aVFqpeaU7tTnc79PaNY8PLnLZCdT1PpFw+01HU3yj8z4TdRwNthjlDGK7YnLla4QahSVVCgYAGwg6gEn3ggnOY9SSJGmyBqGCK5hO684/dnxh2BqV3tQYP8AlZaZDBsMTtgar4GFrBPbiG7yDKkwqZzigRTEEyZlhqRkGomHYzqB0CRKQhQyQSDcOqKzp5QJSXmSJKUOx2pSFOIiXnpQBpTtjqAYihO6MUG5rUuC1xzielNt7bI2lGtaHfEgaZW4mYq7yNRYWrRcQYDZ3EKTsw2yK0TJLThmqhRk/wB/KavA+GGuzB3Wmaah32ZzqZsJSVRuznfYeBjEaSs6XsNb6EdyMF2Cg+IA6eO5nWq/U7dDM3gLo9GmVXSNOkqD+IEgnPjnMuVVxtgkEH1GMyGUrk2elGKUUjM4nU58vAnb/n/ycZf6tRHQ75/adldeWcbj23+8xbq0yfbw29p0WaaOQu7ckbj/AHmCyHJwDid9dUF5dfcDlMuvaou53OPb2j4SoVKFnJhD4SQOJpXtcDIAx4TKZsxydiJKiy9yCMBVHnjJk7O1Ltty6noBK9JMkTqbO30IF6829YUrFzlqgS0cAKOQku7MtqsdsTdImtlZKOYQ0cSaPJl4GcgOMdIwOY7vIoTDZ1E2SBZMwjEyQUzro5oCLeTVMRnciPTqZhTBQJzEIZ0BiKgTtjtSuyCRIEIYtM6ztQQSLEOAI2mDYOoPTI92JJhETO2O1I6RFFiKdYaN2nDqgPMR4pkoIVLVT0mVxJQmQACwwTnkoOfvyMUUJlgOBcMavUBA+U88gaSegz188bdJq9p+EJRalTRmXvdNJ+7JRqbucFc/iUjOfcdYooycVoYhJ/VSO44ZZCjSphSWCJhifmZ87tDXdcYzz2BBx0PKKKeUz1DIr1huCNznI6bGZd1cjAI3B23H3jRTommZDvqOf06ekyeKXQXzOOe8UUdHsXLo52tV1HMiqxRSgkZqcPp4wx6cvWa9OtFFNREZewurMTAmPFDIXECQYQRRTgiAh6aiKKBhRNlEQMUU5HMDUAMAVwYooUBhQdoJ8xRTLNICRvGbMUUJxDeLvSIopk4IKmYytFFOOC5EUUU4J//Z', price: 2000},
    {id: '2', title: 'product 2', description: 'this is a product', image: 'data:image/jpeg;base64,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', price: 2000},
    {id: '3', title: 'product 3', description: 'this is a product', image: 'data:image/jpeg;base64,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', price: 2000},
]

const reducer = createReducer(
    initialState,
    on(createProduct, (state, action) => {
        console.log("payload", action.payload);
        
        return [...state, {id: Date.now().toString(), ...action.payload}]
    })
)

export function ProductsReducer(state: Product[] | undefined, action: Action) {
    return reducer(state, action);
  }
