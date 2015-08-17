function transitionBind(transit, genTransit) {
    return function (context) {
        var result = transit(context);
        var nextTransit = genTransit(result.product);
        return nextTransit(result.context);
    };
}

var pack = function (product) {
    return function (context) {
        return {
            product: product,
            context: context
        };
    };
};

var pushT = function (product) {
    return function (context) {
        context.push(product);
        return {
            product: null,
            context: context
        };
    };
};

var popT = function (context) {
    var product = context.pop();
    return {
        product: product,
        context: context
    };
};

var example1 = transitionBind(pushT(4), function (_) {
    return transitionBind(pushT(5), function (_) {
        return pushT(6);
    });
});

var example2 = transitionBind(popT, function (product1) {
    return transitionBind(popT, function (product2) {
        return pack(product1 + product2);
    });
});

var recursivePush = function (count) {
    return function (product) {
        if (count === 0) {
            return pack(null);
        } else {
            return transitionBind(pushT(product), recursivePush(count - 1));
        }
    };
};

console.log(recursivePush(5)(10)([]));

var c = document.getElementById("context");
var p = document.getElementById("product");
var b1 = document.getElementById("example1");
var b2 = document.getElementById("example2");
var b12 = document.getElementById("example1_example2");
var b21 = document.getElementById("example2_example1");


b1.addEventListener("click", function (_) {
    var result = example1([1, 2, 3]);
    c.innerText = null;
    p.innerText = null;
    var textNodeC = document.createTextNode(result.context);
    var textNodeP = document.createTextNode(result.product);
    c.appendChild(textNodeC);
    p.appendChild(textNodeP);
});

b2.addEventListener("click", function (_) {
    var result = example2([1, 2, 3]);
    c.innerText = null;
    p.innerText = null;
    var textNodeC = document.createTextNode(result.context);
    var textNodeP = document.createTextNode(result.product);
    c.appendChild(textNodeC);
    p.appendChild(textNodeP);
});

b12.addEventListener("click", function (_) {
    var result = transitionBind(example1,function(_){ 
        return example2;
    })([1,2,3]);
    c.innerText = null;
    p.innerText = null;
    var textNodeC = document.createTextNode(result.context);
    var textNodeP = document.createTextNode(result.product);
    c.appendChild(textNodeC);
    p.appendChild(textNodeP);
});


b21.addEventListener("click", function (_) {
    var result = transitionBind(example2,function(_){ 
        return example1;
    })([1,2,3]);
    c.innerText = null;
    p.innerText = null;
    var textNodeC = document.createTextNode(result.context);
    var textNodeP = document.createTextNode(result.product);
    c.appendChild(textNodeC);
    p.appendChild(textNodeP);
});
