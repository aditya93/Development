// function Node(val){
// 	this.value=val;
// 	this.left=null;
// 	this.right=null;
// }

// Node.prototype.visit = function(val){	
// 	if(this.value == val){
// 		console.log("Found "+ val);
// 	}else if(val < this.value && this.left != null){
// 		this.left.search(val);
// 	}else if(val > this.value && this.right != null){
// 		this.right.search(val);
// 	}
// }

// Node.prototype.addNode =function(n)
// {
// 	if(n.value < this.value){
// 		if(this.left == null){
// 			this.left=n;
// 		}else{
// 			this.left.addNode(n);
// 		}
// 	}else if(n.value > this.value){
// 		if(this.right == null){
// 			this.right=n;
// 		}else{
// 			this.right.addNode(n);
// 		}
// 	}
// }

function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

Node.prototype.search = function(val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
    return this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
}

Node.prototype.visit = function() {
  if (this.left != null) {
    this.left.visit();
  }
  console.log(this.value);
  if (this.right != null) {
    this.right.visit();
  }
}

Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
    } else {
      this.left.addNode(n)
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
    } else {
      this.right.addNode(n);
    }
  }
}
