"""
This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well
as testing instructions are located at http://amzn.to/1LzFrj6

For additional samples, visit the Alexa Skills Kit Getting Started guide at
http://amzn.to/1LGWsLG
"""

from __future__ import print_function


# --------------- Helpers that build all of the responses ----------------------

def build_speechlet_response(title, output, reprompt_text, should_end_session):
    return {
        'outputSpeech': {
            'type': 'PlainText',
            'text': output
        },
        'card': {
            'type': 'Simple',
            'title': title,
            'content': output
        },
        'reprompt': {
            'outputSpeech': {
                'type': 'PlainText',
                'text': reprompt_text
            }
        },
        'shouldEndSession': should_end_session
    }


def build_response(session_attributes, speechlet_response):
    return {
        'version': '1.0',
        'sessionAttributes': session_attributes,
        'response': speechlet_response
    }


# --------------- Functions that control the skill's behavior ------------------

def get_welcome_response():
    """ If we wanted to initialize the session to have some attributes we could
    add those here
    """

    session_attributes = {}
    card_title = "Welcome"
    speech_output = "Welcome to Sub It. " \
                    "What ingredient are you looking to substitute?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to substitute for."

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))


def handle_session_end_request():
    card_title = "Session Ended"
    speech_output = "Hope that helped."
    
    # Setting this to true ends the session and exits the skill.
    should_end_session = True
    return build_response({}, build_speechlet_response(
        card_title, speech_output, None, should_end_session))

'''
def create_favorite_color_attributes(favorite_color):
    return {"favoriteColor": favorite_color}
'''

def help_reponse():
    card_title = "HelpResponse"
    speech_output = "You can ask about an ingredient substitution by saying the name of the ingredient you'd need to substitute.  For example, you can say sour cream"
    
    # Setting this to true ends the session and exits the skill.
    should_end_session = False
    return build_response({}, build_speechlet_response(
        card_title, speech_output, None, should_end_session))
    

def set_color_in_session(intent, session):
    """ Sets the color in the session and prepares the speech to reply to the
    user.
    """

    card_title = intent['name']
    session_attributes = {}
    should_end_session = False

    if 'Color' in intent['slots']:
        favorite_color = intent['slots']['Color']['value']
        session_attributes = create_favorite_color_attributes(favorite_color)
        speech_output = "Sorry, I don't seem to know that one. You can leave a comment on the sub it skill page if you'd like to see a substitution added. Would you like another sub?"
        reprompt_text = "Would you like another sub?"
    else:
        speech_output = "Sorry, I don't seem to know that one. You can leave a comment on the sub it skill page if you'd like to see a substitution added. Would you like another sub?"
        reprompt_text = "Would you like another sub?"
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))


def get_color_from_session(intent, session):
    session_attributes = {}
    reprompt_text = None

    if session.get('attributes', {}) and "favoriteColor" in session.get('attributes', {}):
        favorite_color = session['attributes']['favoriteColor']
        speech_output = "Sorry, I don't seem to know that one. Would you like another sub?"
        should_end_session = False
    else:
        speech_output = "Sorry, I don't seem to know that one. Would you like another sub?"
        should_end_session = False

    # Setting reprompt_text to None signifies that we do not want to reprompt
    # the user. If the user does not respond or says something that is not
    # understood, the session will end.
    return build_response(session_attributes, build_speechlet_response(
        intent['name'], speech_output, reprompt_text, should_end_session))

'''
def butter_sub(intent, session):
    card_title = "butter response"
    session_attributes = {}
    reprompt_text = None
    speech_output = "A substitute for butter is applesauce"
    should_end_session = False
    
    return build_response(session_attributes, build_speechlet_response(
    card_title, speech_output, reprompt_text, should_end_session))
'''

def keep_going():

    session_attributes = {}
    card_title = "Keep Going"
    speech_output = "What ingredient would you like to sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))

def butter_sub():

    session_attributes = {}
    card_title = "ButterSub"
    speech_output = "Butter is a tricky one.  For baking, you can substitute with" \
                    "an equal amount of margarine or lard. For cooking, substitute " \
                    "a smaller amount of oil.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))

def sour_cream_sub():

    session_attributes = {}
    card_title = "Welcome"
    speech_output = "A great substitute for sour cream is plain greek yogurt.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def butter_milk_sub():

    session_attributes = {}
    card_title = "ButterMilk"
    speech_output = "For one cup buttermilk, substitute just under one cup regular-milk.  Mix with one tablespoon vinegar or lemon" \
                    "juice.  You can also substitute with plain yogurt or sour cream, thinned with milk or water, to the proper" \
                    "consistency.  You can also substitute by adding one and three quarters teaspoon of cream of tartar to a cup-of" \
                    "milk.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def brown_sugar_sub():

    session_attributes = {}
    card_title = "BrownSugar"
    speech_output = "A good substitute for brown sugar is one cup white sugar, plus one quarter cup" \
                    "molasses.  You may need to decrease the liquid in the recipe.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def baking_powder_sub():

    session_attributes = {}
    card_title = "BrownSugar"
    speech_output = "For one teaspoon baking powder, combine one-quarter teaspoon baking soda, plus one half teaspoon cream of tartar.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))

def half_and_half_sub():

    session_attributes = {}
    card_title = "HalfandHalf"
    speech_output = "For one cup half and half, substitute with one tablespoon melted butter, plus enough whole milk to make one cup.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))

def molasses_sub():

    session_attributes = {}
    card_title = "MoleassesSub"
    speech_output = "Molasses has a distinct flavor, but if you need to substitute it try replacing with honey, dark corn syrup, or maple syrup.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def un_choc_sub():

    session_attributes = {}
    card_title = "UnChocSub"
    speech_output = "For one ounce unsweented chocolate, substitute with three tablespoons unsweetend cocoa powder, with one tablespoon melted shortening, butter, or oil.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def ricotta_sub():

    session_attributes = {}
    card_title = "RicottaSub"
    speech_output = "A good substitute for ricotta cheese is cottage cheese.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def heavy_cream_sub():

    session_attributes = {}
    card_title = "HeavyCreamSub"
    speech_output = "For one cup heavy cream, substitute with three quarter cups milk, plus three tablespoons melted butter. Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))

def self_rising_sub():

    session_attributes = {}
    card_title = "SelfRisingSub"
    speech_output = "For one cup self rising flour, substitute with one cup all purpose flour, plus one and a half teaspoons baking powder, and one quarter teaspoon salt. Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def oil_sub():

    session_attributes = {}
    card_title = "OilSub"
    speech_output = "For cooking oils in baked goods, a good substitute is an equal amount of melted butter, or mayonaise, or coconut oil.  You can also try fruit puree like applesauce but add half the called amount.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))

def food_sub():

    session_attributes = {}
    card_title = "FoodSub"
    speech_output = "You can specify the specific ingredient you'd like to sub for."
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))

def drink_sub():

    session_attributes = {}
    card_title = "SelfRisingSub"
    speech_output = "I don't currently cover drink substitutions, but I'm learning.  You can leave a comment on my skill page if you'd like us to add a substitution.  Would you like another sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def not_found():

    session_attributes = {}
    card_title = "NotFound"
    speech_output = "Sorry, I don't seem to know that one.  You can leave a comment on my skill page if you'd like to see a sub added.  Would you like to request a different sub?"
 
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "You can tell me what ingredient you'd like to sub. "

    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
# --------------- Events ------------------

def on_session_started(session_started_request, session):
    """ Called when the session starts """

    print("on_session_started requestId=" + session_started_request['requestId']
          + ", sessionId=" + session['sessionId'])


def on_launch(launch_request, session):
    """ Called when the user launches the skill without specifying what they
    want
    """

    print("on_launch requestId=" + launch_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    # Dispatch to your skill's launch
    return get_welcome_response()


def on_intent(intent_request, session):
    """ Called when the user specifies an intent for this skill """

    print("on_intent requestId=" + intent_request['requestId'] +
          ", sessionId=" + session['sessionId'])

    intent = intent_request['intent']
    intent_name = intent_request['intent']['name']

    # Dispatch to your skill's intent handlers

    if intent_name == "MyColorIsIntent":
        return set_color_in_session(intent, session)
    elif intent_name == "WhatsMyColorIntent":
        return get_color_from_session(intent, session)
    elif intent_name == "RequestIntent":
        return not_found()
    elif intent_name == "ButterIntent":
        return butter_sub()
    elif intent_name == "SourCreamIntent":
        return sour_cream_sub()
    elif intent_name == "ButterMilkIntent":
        return butter_milk_sub()
    elif intent_name == "BrownSugarIntent":
        return brown_sugar_sub()
    elif intent_name == "BakingPowderIntent":
        return baking_powder_sub()
    elif intent_name == "HalfandHalfIntent":
        return half_and_half_sub()
    elif intent_name == "MolassesIntent":
        return molasses_sub()
    elif intent_name == "UnChocIntent":
        return un_choc_sub()
    elif intent_name == "RicottaIntent":
        return ricotta_sub()
    elif intent_name == "HeavyCreamIntent":
        return heavy_cream_sub()
    elif intent_name == "SelfRisingIntent":
        return self_rising_sub()
    elif intent_name == "OilIntent":
        return oil_sub()
    elif intent_name == "FoodIntent":
        return food_sub()
    elif intent_name == "DrinkIntent":
        return drink_sub()
    elif intent_name == "ContinueIntent":
        return keep_going()
    elif intent_name == "AMAZON.HelpIntent":
        return help_reponse()
    elif intent_name == "AMAZON.CancelIntent" or intent_name == "AMAZON.StopIntent":
        return handle_session_end_request()
    elif intent_name != "ButterIntent" or "SourCreamIntent" or "ButterMilkIntent" or "BrownSugarIntent" or "BakingPowderIntent" or "HalfandHalfIntent" or "MolassesIntent" or "UnChocIntent" or "RicottaIntent" or "HeavyCreamIntent" or "SelfRisingIntent":
        return not_found()
    else:
        return not_found()


def on_session_ended(session_ended_request, session):
    """ Called when the user ends the session.

    Is not called when the skill returns should_end_session=true
    """
    print("on_session_ended requestId=" + session_ended_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    # add cleanup logic here


# --------------- Main handler ------------------

def lambda_handler(event, context):
    """ Route the incoming request based on type (LaunchRequest, IntentRequest,
    etc.) The JSON body of the request is provided in the event parameter.
    """
    print("event.session.application.applicationId=" +
          event['session']['application']['applicationId'])

    """
    Uncomment this if statement and populate with your skill's application ID to
    prevent someone else from configuring a skill that sends requests to this
    function.
    """
    # if (event['session']['application']['applicationId'] !=
    #         "amzn1.echo-sdk-ams.app.[unique-value-here]"):
    #     raise ValueError("Invalid Application ID")

    if event['session']['new']:
        on_session_started({'requestId': event['request']['requestId']},
                           event['session'])

    if event['request']['type'] == "LaunchRequest":
        return on_launch(event['request'], event['session'])
    elif event['request']['type'] == "IntentRequest":
        return on_intent(event['request'], event['session'])
    elif event['request']['type'] == "SessionEndedRequest":
        return on_session_ended(event['request'], event['session'])
