// register sw
if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("sw.js", {
        scope: "./"
      })
      .then(function (reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}


$(document).ready(function() {
  $('button').addClass('disabled') 
  $('#resetGame').removeClass('disabled')
    
  gameinit()
  
  var rolls = 3, bonusTotal = 0, leftTotal = 0, rightTotal = 0, grandTotal = 0, yBonus = false, gameOver = false, roundComplete = 0, have5 = false 
  
  
  function nextRoll() {
    
    if ( (roundComplete == 13) && yBonus == false ) gameOver = true
    if ( (roundComplete == 14) && yBonus == true ) gameOver = true
    

    
    $('.calculated').html('')
    $('.game .dice').removeClass('hold')
      .removeClass('dice-1 dice-2 dice-3 dice-4 dice-5 dice-6')
    $('.yahtzeeBRoll').html('')

    update('bonusTotal')
    update('leftTotal')
    update('rightTotal')
    update('grandTotal')
    
    if ( gameOver ) {
      $('.gameOver').removeClass('isHidden')
      $('.game').addClass('isHidden')
      $('#rollDice').addClass('disabled')
      rolls = 0
      update('rolls')
    } else {
      rolls = 3
      update('rolls')
      $('#rollDice').removeClass('disabled')
    }
  
  }
  
  function gameinit() {
    rolls = 3
    bonusTotal = 0
    leftTotal = 0
    rightTotal = 0
    grandTotal = 0
    roundComplete = 0
    yBonus = false
    gameOver = false
    
    $('.gameOver').addClass('isHidden')
    $('.game').removeClass('isHidden')
    
    $('#rollDice').removeClass('disabled')
    $('.score').html('').addClass('empty')
    $('.rolls').removeClass('empty')
    $('.bonusTotal').removeClass('empty')
    $('.leftTotal').removeClass('empty')
    $('.rightTotal').removeClass('empty')
    $('.grandTotal').removeClass('empty')
    nextRoll()
  }
  
  $('.game .dice').on({
    'click': function() {
      if ( $(this).hasClass('dice-on')) {
        $(this).toggleClass('hold')
      }
    }
  })
  
  $('#resetGame').on({
    'click': function() {
      gameinit()
    }
  })
  
    $('.scores button').on({
    'click': function() {
      if ($(this).hasClass('disabled')) {
        // do nothing //
      } else {
        
        var value = $(this).closest('tr').find('.calculated').text()
        $(this).closest('tr').find('.score').removeClass('empty').html( value )
        
        $('.scores button').addClass('disabled')
        rolls = 3
        grandTotal = grandTotal + parseInt(value)
        
        if ( $(this).closest('table').find('.ones').length > 0 ) {
          leftTotal = leftTotal + parseInt(value)
          if ( bonusTotal == 0 && leftTotal >= 63 ) {
            bonusTotal = 35
            leftTotal = leftTotal + bonusTotal
          }
        } else {
          rightTotal = rightTotal + parseInt(value)
        }
        
        if ( $(this).is('#yahtzeeSelect') && have5 ) yBonus = true
        
        roundComplete++
        nextRoll()
      }
    }
  })
  
  $('#rollDice').on({
    'click': function() {
      if ($(this).hasClass('disabled')) {
        // do nothing //
      } else {
        rollDice()
      }
    }
    
  })
  
  function rollDice() {
    rolls--
    if (rolls == 0)  $('#rollDice').addClass('disabled')
    
    $('.game .dice').not('.hold').each(function(index){
      var $this = $(this);
      var ran = GetRandomNum()
      $this.removeClass('dice-1 dice-2 dice-3 dice-4 dice-5 dice-6')
           .addClass('dice-on')  
           .addClass('dice-' + ran )
           .data('value',ran)
    })
    update('rolls')
    showScores()
  }
  
  function showScores() {
    var val = 0
    var dice = []
    $('.game .dice').each(function(index){
      dice[index] = $(this).data('value')
    })
    
    val = 0
    $.each(dice,function(index,value){
      if (value == 1) val++
    })
    if ($('.ones').hasClass('empty') ) {
      $('.onesRoll').html(val)
      $('#onesSelect').removeClass('disabled')
    }
    
    val = 0
    $.each(dice,function(index,value){
      if (value == 2) val++
    })
    if ( $('.twos').hasClass('empty') ) {
      $('.twosRoll').html(val * 2)
      $('#twosSelect').removeClass('disabled')
    }
    
    val = 0
    $.each(dice,function(index,value){
      if (value == 3) val++
    })
    if ( $('.threes').hasClass('empty') ) {
      $('.threesRoll').html(val * 3)
      $('#threesSelect').removeClass('disabled')
    }
    
    
    val = 0
    $.each(dice,function(index,value){
      if (value == 4) val++
    })
    if ( $('.fours').hasClass('empty') ) {
      $('.foursRoll').html(val * 4)
      $('#foursSelect').removeClass('disabled')
    }
    
    val = 0
    $.each(dice,function(index,value){
      if (value == 5) val++
    })
    if ( $('.fives').hasClass('empty') ) {
      $('.fivesRoll').html(val * 5)
      $('#fivesSelect').removeClass('disabled')
    }
    
    val = 0
    $.each(dice,function(index,value){
      if (value == 6) val++
    })
    if ( $('.sixes').hasClass('empty') ) {
      $('.sixesRoll').html(val * 6)
      $('#sixesSelect').removeClass('disabled')
    }
    
    val = 0
    var is1 = 0, is2 = 0, is3 = 0, is4 = 0, is5 = 0, is6 = 0
    have5 = false
    $.each(dice,function(index,value){
      val = val + value
      if (value == 1) is1++
      if (value == 2) is2++
      if (value == 3) is3++
      if (value == 4) is4++
      if (value == 5) is5++
      if (value == 6) is6++
    })
    var have2 = false, have3 = false, have4 = false, haveHouse = false
    if ( is1 == 2 ) have2 = true
    if ( is2 == 2 ) have2 = true
    if ( is3 == 2 ) have2 = true
    if ( is4 == 2 ) have2 = true
    if ( is5 == 2 ) have2 = true
    if ( is6 == 2 ) have2 = true
    
    if ( is1 >= 3 ) have3 = true
    if ( is2 >= 3 ) have3 = true
    if ( is3 >= 3 ) have3 = true
    if ( is4 >= 3 ) have3 = true
    if ( is5 >= 3 ) have3 = true
    if ( is6 >= 3 ) have3 = true
    
    if ( is1 >= 4 ) have4 = true
    if ( is2 >= 4 ) have4 = true
    if ( is3 >= 4 ) have4 = true
    if ( is4 >= 4 ) have4 = true
    if ( is5 >= 4 ) have4 = true
    if ( is6 >= 4 ) have4 = true
    
    if ( is1 >= 5 ) have5 = true
    if ( is2 >= 5 ) have5 = true
    if ( is3 >= 5 ) have5 = true
    if ( is4 >= 5 ) have5 = true
    if ( is5 >= 5 ) have5 = true
    if ( is6 >= 5 ) have5 = true
    
    
    if ( $('.kind3').hasClass('empty') ) {
      if (have3) {
        $('.kind3Roll').html(val)  
      } else {
        $('.kind3Roll').html(0)
      }
      $('#kind3Select').removeClass('disabled')
    }
  
    if ( $('.kind4').hasClass('empty') ) {
      if (have4) {
        $('.kind4Roll').html(val)  
      } else {
        $('.kind4Roll').html(0)
      }
      $('#kind4Select').removeClass('disabled')
    }
  
    if ( $('.fHouse').hasClass('empty') ) {
      if (have2 && have3) {
        $('.fHouseRoll').html(50)  
      } else {
        $('.fHouseRoll').html(0)
      }
      $('#fHouseSelect').removeClass('disabled')
    }
    
    if ( $('.sStraight').hasClass('empty') ) {
      if (have3 || have4 || have5) {
        $('.sStraightRoll').html(0) 
      } else {
        
        var ss = false
        if ( (is1>=1) && (is2>=1) && (is3>=1) && (is4>=1) ) ss = true
        if ( (is2>=1) && (is3>=1) && (is4>=1) && (is5>=1)  ) ss = true
        if ( (is3>=1) && (is4>=1) && (is5>=1) && (is6>=1) ) ss = true
        if (ss) {
          $('.sStraightRoll').html(30)  
        } else {
          $('.sStraightRoll').html(0)  
        }
      }
      $('#sStraightSelect').removeClass('disabled')
    }
    
    
    
    if ( $('.lStraight').hasClass('empty') ) {
      if (have2 || have3 || have4 || have5) {
        $('.lStraightRoll').html(0) 
      } else {
        
        var ls = false
        if ( (is1>=1) && (is2>=1) && (is3>=1) && (is4>=1) && (is5>=1) ) ls = true
        if ( (is2>=1) && (is3>=1) && (is4>=1) && (is5>=1)  && (is6>=1) ) ls = true
        if (ls) {
          $('.lStraightRoll').html(40)  
        } else {
          $('.lStraightRoll').html(0)  
        }
      }
      $('#lStraightSelect').removeClass('disabled')
    }
    
    if ( $('.yahtzee').hasClass('empty') ) {
      if (have5) {
        $('.yahtzeeRoll').html(50)  
      } else {
        $('.yahtzeeRoll').html(0)
      }
      $('#yahtzeeSelect').removeClass('disabled')
      
    }
    
    if ( yBonus && have5 && $('.yahtzeeB').hasClass('empty') ) {
      $('.yahtzeeBRoll').html(50)
      $('#yahtzeeBSelect').removeClass('disabled')
    } else if ( yBonus && $('.yahtzeeB').hasClass('empty') ) {
      $('.yahtzeeBRoll').html(0)
      $('#yahtzeeBSelect').removeClass('disabled')
    } 
    
    if ( $('.chance').hasClass('empty') ) {
      $('.chanceRoll').html(val)
      $('#chanceSelect').removeClass('disabled')
    }
  }
  
  
  
  function GetRandomNum() {
    var n = (Math.floor(Math.random() * 6) + 1);
    return n;
  }
  
  function update(cls) {
    var val
    if (cls == "rolls") {
      val = rolls
    } else if (cls== "bonusTotal") {
      val = bonusTotal
    } else if (cls== "leftTotal") {
      val = leftTotal
    } else if (cls== "rightTotal") {
      val = rightTotal
    } else if (cls== "grandTotal") {
      val = grandTotal
    }
    
    $('.score.' + cls).html(val)
  }
  
})