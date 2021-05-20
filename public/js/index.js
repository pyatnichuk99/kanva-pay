document.addEventListener("DOMContentLoaded", () => {
    // console.log('123');
    const price = document.querySelector('.journal-price__text').innerHTML;
    let count = document.querySelector('.journal-count__text').innerHTML;
    let total = document.querySelector('.total').innerHTML;

    const plus = document.querySelector('.fa-plus-circle');

    const minus = document.querySelector('.fa-minus-circle');

    plus.addEventListener('click',()=>{        
        count = parseInt(count)+1;
        document.querySelector('.journal-count__text').innerHTML = count;
        total = parseInt(price) * parseInt(count);

        document.querySelector('.total').innerHTML = total;
        // document.querySelector('.total_price').innerHTML = total;
        // console.log(document.querySelector('.total_price').value);
        let total_value = document.querySelector('.total_price');
        // console.log(total_value);
        total_value.value = total;
        // cons
        // console.log(total_value.value);
        
    })
    
    minus.addEventListener('click',()=>{
        if(parseInt(count)>1){
            count = parseInt(count)-1;

            document.querySelector('.journal-count__text').innerHTML = count;

            total = parseInt(price) * parseInt(count);

            document.querySelector('.total').innerHTML = total;
            document.querySelector('.total_price').innerHTML = total;
            let total_value = document.querySelector('.total_price');

            total_value.value = total;
        }
        else{

            document.querySelector('.journal-count__text').innerHTML = count;

            total = parseInt(price) * parseInt(count);
            document.querySelector('.total').innerHTML = total;
            let total_value = document.querySelector('.total_price');
            // console.log(total_value);
            total_value.value = total;
        }
    })

    let total_value = document.querySelector('.total_price');
        // console.log(total_value);
    total_value.value = total;


})